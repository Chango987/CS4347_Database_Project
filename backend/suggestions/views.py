from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from django.db import connection
import json

from stocks.models import Stock, UserStocks
from stocks.views import UserStockSerializer, StocksSerializer

from .models import StockSuggestion

class StockSuggestionSerializer(serializers.ModelSerializer):
    stock = StocksSerializer

    class Meta:
        model = StockSuggestion
        fields = [
            'stock',
            'iteration',
            'shares',
            'price_per_share',
            'creation_time',
        ]

class ViewStocksSuggestions(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        user = request.user
        cap_size_portfolio = json.loads(data['cap_size_portfolio'])
        buying_power = int(data['buying_power'])

        # Get user's stocks
        stock_list = UserStocks.objects.raw("SELECT * FROM stocks_userstocks WHERE user_id = %s", [user.id])
        stock_list = UserStockSerializer(stock_list, many=True).data

        current_holdings = 0
        large_cap_list = []
        medium_cap_list = []
        small_cap_list = []
        # Classify and calculate current holdings
        for stock in stock_list:
            current_holdings += stock["stocks"]["price"] * stock["shares"]
            stock["stocks"]["shares"] = stock["shares"]
            if stock["stocks"]["cap_size"] == "l":
                large_cap_list.append(stock["stocks"])
            elif stock["stocks"]["cap_size"] == "m":
                medium_cap_list.append(stock["stocks"])
            else:
                small_cap_list.append(stock["stocks"])

        # Get net holdings for each cap size with new cash amount
        power_partition = {
            cap_size: (buying_power + current_holdings) * (cap_size_portfolio[cap_size]/100)
            for cap_size in cap_size_portfolio.keys()
        }

        print(buying_power + current_holdings)
        print(cap_size_portfolio)

        # Average cost per company (not per single stock of a company)
        avg_large_cap_cost = (power_partition["large_cap"] / len(large_cap_list) if len(large_cap_list) != 0 else 0)
        avg_medium_cap_cost = (power_partition["medium_cap"] / len(medium_cap_list) if len(medium_cap_list) != 0 else 0)
        avg_small_cap_cost = (power_partition["small_cap"] / len(small_cap_list) if len(small_cap_list) != 0 else 0)
        
        for stock in large_cap_list:
            if avg_large_cap_cost > (stock["price"] * stock["shares"]):
                stock["buy"] = (avg_large_cap_cost - (stock["price"] * stock["shares"])) / stock["price"]
        for stock in medium_cap_list:
            if avg_medium_cap_cost > (stock["price"] * stock["shares"]):
                stock["buy"] = (avg_medium_cap_cost - (stock["price"] * stock["shares"])) / stock["price"]
        for stock in small_cap_list:
            if avg_small_cap_cost > (stock["price"] * stock["shares"]):
                stock["buy"] = (avg_small_cap_cost - (stock["price"] * stock["shares"])) / stock["price"]

        final_list = large_cap_list
        final_list.extend(medium_cap_list)
        final_list.extend(small_cap_list)

        final_list = [item for item in final_list if "buy" in item]

        if len(final_list) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)

        with connection.cursor() as cursor:
            # Update iterations
            sql_statement = f"""
                UPDATE suggestions_stocksuggestion
                SET iteration = iteration + 1
                WHERE user_id = %s
            """
            cursor.execute(sql_statement, [user.id])

            # Delete iterations
            sql_statement = f"""
                DELETE FROM suggestions_stocksuggestion
                WHERE user_id = %s and iteration = 3
            """
            cursor.execute(sql_statement, [user.id])

            # Create suggestion
            sql_statement = f"""
                INSERT INTO suggestions_stocksuggestion
                (user_id, stock_id, iteration, shares, price_per_share, creation_time)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            temp_list = [
                (user.id, stock['id'], 0, stock['buy'], stock['price'], 'now()')
                for stock in final_list
            ]
            cursor.executemany(sql_statement, temp_list)
        connection.commit()

        return Response({
            "current_holding_val": current_holdings,
            "recommend": final_list
        })

    def get(self, request, format=None):
        user = request.user
        suggested_info = StockSuggestion.objects.raw(
            f"""
                SELECT * FROM suggestions_stocksuggestion
                WHERE user_id = %s
                ORDER BY creation_time DESC
            """,
            [user.id]
        )

        suggested_info = StockSuggestionSerializer(suggested_info, many=True).data

        return Response(suggested_info)

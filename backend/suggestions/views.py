from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.db import connection
import json

from users.models import User
from stocks.models import Stock, UserStocks
from stocks.views import UserStockSerializer

class ViewStocksSuggestions(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        user = request.user
        cap_size_portfolio = json.loads(data['cap_size_portfolio'])
        buying_power = int(data['buying_power'])

        power_partition = {
            cap_size: buying_power * (cap_size_portfolio[cap_size]/100)
            for cap_size in cap_size_portfolio.keys()
        }

        stock_list = UserStocks.objects.raw("SELECT * FROM stocks_userstocks WHERE user_id = %s", [user.id])
        stock_list = UserStockSerializer(stock_list, many=True).data

        large_cap_list = [stock["stocks"] for stock in stock_list if stock["stocks"]["cap_size"] == "l"]
        medium_cap_list = [stock["stocks"] for stock in stock_list if stock["stocks"]["cap_size"] == "m"]
        small_cap_list = [stock["stocks"] for stock in stock_list if stock["stocks"]["cap_size"] == "s"]

        avg_large_cap_cost = (power_partition["large_cap"] / len(large_cap_list) if len(large_cap_list) != 0 else 0)
        avg_medium_cap_cost = (power_partition["medium_cap"] / len(medium_cap_list) if len(medium_cap_list) != 0 else 0)
        avg_small_cap_cost = (power_partition["small_cap"] / len(small_cap_list) if len(small_cap_list) != 0 else 0)
        
        for stock in large_cap_list:
            stock["shares"] = avg_large_cap_cost / stock["price"]
        for stock in medium_cap_list:
            stock["shares"] = avg_medium_cap_cost / stock["price"]
        for stock in small_cap_list:
            stock["shares"] = avg_small_cap_cost / stock["price"]

        large_cap_list.extend(medium_cap_list)
        large_cap_list.extend(small_cap_list)
        final_list = large_cap_list

        with connection.cursor() as cursor:
            sql_statement = f"""
                INSERT INTO suggestions_stocksuggestion
                (user_id, stock_id, iteration, shares, price_per_share, creation_time)
                VALUES (%s, %s, %s, %s, %s, %s)
            """

            temp_list = [
                (user.id, stock['id'], 0, stock['shares'], stock['price'], 'now()')
                for stock in final_list
            ]

            cursor.executemany(sql_statement, temp_list)

        connection.commit()

        return Response(final_list)


from django.contrib import admin
from django.urls import path
from users.views import ViewUsers, ViewUserPortfolio, ViewUserPortfolioActual
from stocks.views import ViewStocks, ViewUserStocks

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', ViewUsers.as_view(), name='user'),
    path('stocks/', ViewStocks.as_view(), name='stocks'),
    path('user_stocks/', ViewUserStocks.as_view(), name='user_stocks'),
    path('user_portfolio/', ViewUserPortfolio.as_view(), name='user_portfolio'),
    path('user_portfolio_actual/', ViewUserPortfolioActual.as_view(), name='user_portfolio_actual')
]

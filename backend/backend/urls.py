from django.contrib import admin
from django.urls import path
from users.views import ViewUsers
from stocks.views import ViewStocks, ViewUserStocks
from suggestions.views import ViewStocksSuggestions

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', ViewUsers.as_view(), name='user'),
    path('stocks/', ViewStocks.as_view(), name='stocks'),
    path('user_stocks/', ViewUserStocks.as_view(), name='user_stocks'),
    path('stocks_suggestions/', ViewStocksSuggestions.as_view(), name='stocks_suggestions')
]

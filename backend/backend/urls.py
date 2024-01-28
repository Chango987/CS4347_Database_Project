from django.contrib import admin
from django.urls import path
from users.views import ViewUsers
from stocks.views import ViewStocks, ViewUserStocks

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', ViewUsers.as_view(), name='user'),
    path('stocks/', ViewStocks.as_view(), name='stocks'),
    path('user_stocks/', ViewUserStocks.as_view(), name='user_stocks')
]

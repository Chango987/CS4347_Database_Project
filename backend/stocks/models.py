from django.db import models
from users.models import User

# Create your models here.
CAP_SIZE = [
    ("s", "small"), 
    ("m", "medium"),
    ("l", "large")
]


class Stock(models.Model):
    ticker = models.CharField(max_length=9, unique=True)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    week_growth = models.FloatField()
    five_year_growth = models.FloatField()
    cap_size = models.CharField(choices=CAP_SIZE, max_length=2)


class UserStocks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stocks = models.ForeignKey(Stock, on_delete=models.CASCADE)



from django.db import models

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


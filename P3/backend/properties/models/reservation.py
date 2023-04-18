from django.db import models
from django.conf import settings
from .property import Property

class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    status = models.CharField(max_length=15)
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    res_start_time = models.DateField(auto_now=False, auto_now_add=False)
    res_end_time = models.DateField(auto_now=False, auto_now_add=False)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    guests = models.CharField(max_length=15, default = "1")
    
    def __str__(self):
        return f"{self.property}"
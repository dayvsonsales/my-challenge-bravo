from locust import task
from locust.contrib.fasthttp import FastHttpUser

from random import randint

class PlaylistRecommendation(FastHttpUser):    
    max_wait = 0
    min_wait = 0
    network_timeout = 1000
    connection_timeout = 1000

    @task
    def valid_cities(self):
      self.client.get(f"/currencies/convert?from=USD&to=BRL&amount=2000")
        

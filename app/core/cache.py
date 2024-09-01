# app/core/cache.py

import redis
from app.core.config import settings

redis_client = redis.Redis.from_url(settings.REDIS_URL)

def set_cache(key:str, value:str,
              ttl:int):
    redis_client.setex(key, ttl, value)

def get_cache(key:str):
    return redis_client.get(key)
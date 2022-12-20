from redis import Redis
import json

from config import redis_conn

redis_client = Redis(**redis_conn)


# получение кэша
def get_cache(h: str):
    cached_value = redis_client.get(h)
    redis_client.close()
    if cached_value is not None:
        # print(cached_value, type(cached_value))
        return json.loads(cached_value)
    return None


# установка кэша
def set_cache(h: str, result: dict):
    redis_client.set(h, json.dumps(result), ex=7200)
    redis_client.close()

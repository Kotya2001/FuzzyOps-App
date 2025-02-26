"""
Файл для подключения к redis и работы с ним
"""

from config import DB, REDIS_HOST, REDIS_PORT

from redis import Redis
import json
from typing import Union, Dict, List


redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=DB)


# получение кэша
def get_cache(h: str) -> Union[Dict[str, str], bool]:
    cached_value = redis_client.get(h)
    redis_client.close()
    if cached_value is not None:
        return json.loads(cached_value)
    return False


# установка кэша
def set_cache(h: str, result: Dict[str, Dict[str, List[float]]]) -> None:
    redis_client.set(h, json.dumps(result), ex=7200)
    redis_client.close()

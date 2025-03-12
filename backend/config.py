import logging
import os
import json

LOG_LEVEL = logging.DEBUG
DIRECTORY_OF_LOGS = os.path.abspath('../logs')
LOG_FORMAT = "%(asctime)s: %(name)s - %(" "levelname)s  | %(message)s"


with open("sets.json", encoding="utf-8") as f:
    sets = json.loads(f.read())


try:
    SERVER_HOST = sets["SERVER_HOST"]
    SERVER_PORT = sets["SERVER_PORT"]
    DB = sets["DB"]
    REDIS_PORT = sets["REDIS_PORT"]
    REDIS_HOST = sets["REDIS_HOST"]
except Exception as e:
    print("Произошла ошибка, отсуствуют ключи")

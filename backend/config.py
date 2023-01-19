import secrets
import logging
import os

LOG_LEVEL = logging.DEBUG
DIRECTORY_OF_LOGS = os.path.abspath('../logs')
LOG_FORMAT = "%(asctime)s: %(name)s - %(" "levelname)s  | %(message)s"
IS_PROD = False


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(100)
    DEVELOPMENT = True
    DB = os.getenv("DB")


# настройки режима разработки
class DevConfig(Configuration):
    ENV = os.getenv("FLASK_ENV_DEV")
    DEVELOPMENT = True
    SERVER_HOST = os.getenv("SERVER_HOST_DEV")
    SERVER_PORT = os.getenv("SERVER_PORT_DEV")
    REDIS_PORT = os.getenv("REDIS_PORT_DEV")
    REDIS_HOST = os.getenv("REDIS_HOST_DEV")


# найстройки режима деплоя
class ProdConfig(Configuration):
    ENV = os.getenv("FLASK_ENV_PROD")
    DEVELOPMENT = False
    SERVER_HOST = os.getenv("SERVER_HOST_PROD")
    SERVER_PORT = os.getenv("SERVER_PORT_PROD")
    REDIS_PORT = os.getenv("REDIS_PORT_PROD")
    REDIS_HOST = os.getenv("REDIS_HOST_PROD")


# установим настройки режимов работы
if IS_PROD:
    SERVER_HOST = ProdConfig().SERVER_HOST
    SERVER_PORT = ProdConfig().SERVER_PORT
    DEBUG = ProdConfig().DEVELOPMENT
    REDIS_HOST = ProdConfig().REDIS_HOST
    REDIS_PORT = ProdConfig().REDIS_PORT
else:
    SERVER_HOST = DevConfig().SERVER_HOST
    SERVER_PORT = DevConfig().SERVER_PORT
    DEBUG = DevConfig().DEVELOPMENT
    REDIS_HOST = DevConfig().REDIS_HOST
    REDIS_PORT = DevConfig().REDIS_PORT

DB = Configuration().DB

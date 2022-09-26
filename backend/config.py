import secrets
import logging
import os

DATABASE_PATH = 'sqlite:///../backend/Users.db'
SERVER_PORT, SERVER_HOST, DEBUG = 5000, 'localhost', True
LOG_LEVEL = logging.DEBUG
DIRECTORY_OF_LOGS = os.path.abspath('../logs')
LOG_FORMAT = "%(asctime)s: %(name)s - %(" "levelname)s  | %(message)s"


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(100)
    JWT_SECRET_KEY = secrets.token_urlsafe(100)
    DEVELOPMENT = True

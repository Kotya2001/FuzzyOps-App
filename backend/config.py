import secrets

DATABASE_PATH = 'sqlite:///../backend/Users.db'
SERVER_PORT, SERVER_HOST, DEBUG = 5000, 'localhost', True


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(64)
    DEVELOPMENT = True

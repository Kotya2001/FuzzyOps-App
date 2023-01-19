import secrets
import logging
import os
import yaml

SERVER_PORT, SERVER_HOST, DEBUG = 5000, 'localhost', True
LOG_LEVEL = logging.DEBUG
DIRECTORY_OF_LOGS = os.path.abspath('../logs')
LOG_FORMAT = "%(asctime)s: %(name)s - %(" "levelname)s  | %(message)s"
redis_config = '../backend/db_settings/redis_config.yaml'

with open(redis_config) as cfg:
    yaml_redis_cfg = yaml.safe_load(cfg)

redis_conn = yaml_redis_cfg['connection']


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(100)
    DEVELOPMENT = True

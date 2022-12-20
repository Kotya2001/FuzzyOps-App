import secrets
import logging
import os
import yaml
import json

SERVER_PORT, SERVER_HOST, DEBUG = 5000, 'localhost', True
LOG_LEVEL = logging.DEBUG
DIRECTORY_OF_LOGS = os.path.abspath('../logs')
LOG_FORMAT = "%(asctime)s: %(name)s - %(" "levelname)s  | %(message)s"
TOKEN_UPDATE_TIME = 86400
db_config = '../backend/db_settings/pg_config.yaml'
redis_config = '../backend/db_settings/redis_config.yaml'
create_file_path = '../backend/menu/create_file.json'
fuzzy_logic_path = '../backend/menu/fuzzy_logic.json'

with open(redis_config) as cfg:
    yaml_redis_cfg = yaml.safe_load(cfg)

redis_conn = yaml_redis_cfg['connection']

with open(create_file_path) as cfp:
    create_file = json.load(cfp)

with open(fuzzy_logic_path) as cfp:
    fuzzy_logic = json.load(cfp)


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(100)
    DEVELOPMENT = True


# настройки БД
class DataBaseConfig:
    def __init__(self):
        with open(db_config) as file:
            yaml_db_config = yaml.safe_load(file)
        conn = yaml_db_config['connection']
        self.DB_PATH = f"postgresql://{conn['database_user']}:" \
                       f"{conn['database_password']}@{conn['database_host']}:{conn['database_port']}/" \
                       f"{conn['database_name']}"


DATABASE_PATH = DataBaseConfig().DB_PATH

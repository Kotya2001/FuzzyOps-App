# from config import IS_PROD, ProdConfig, DevConfig
from logger import logger

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
# # установим настройки режимов работы
# if IS_PROD:
#     app.config.from_object(ProdConfig)
# else:
#     app.config.from_object(DevConfig)

CORS(app, supports_credentials=True)

logger = logger('MAIN')

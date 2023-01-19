from config import Configuration
from logger import logger

from fuzzyLogicOps import app_fuzzy_logic
from redis_db import get_cache

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Configuration)

app.register_blueprint(app_fuzzy_logic)

CORS(app, supports_credentials=True)

logger = logger('MAIN')


@app.route('/')
def page_main():
    """
    Начальная страница
    """
    return jsonify({'status': 'ok', 'msg': 'Service Working'})


@app.route('/ping')
def page_ping():
    """
    Проверка работоспособности сервиса
    """
    return jsonify({'status': 'ok', 'msg': 'Service Working'})


@app.route('/main/download_file/<file_hash>', methods=["GET"])
def download_file(file_hash):
    """
    Функция для скачивания файла с нечеткими вычислениями
    """

    result = get_cache(file_hash)
    x = result['x']
    unity = result['result']['result']
    file = {"x": x, "unity": unity}
    return jsonify({"status": "ok", "file": file})

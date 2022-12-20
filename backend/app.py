from config import DATABASE_PATH, Configuration, redis_config, create_file, fuzzy_logic
from logger import logger
from utils import ForFuzzyLogic, ForFuzzyOps, ForDefuzz
# from database import create_obj, get_user_by_login, generate_tokens

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from fuzzyLogicOps import app_fuzzy_logic

from flask import Flask, jsonify, request, session
from flask_cors import CORS

import datetime as dt

app = Flask(__name__)
app.config.from_object(Configuration)

app.register_blueprint(app_fuzzy_logic)

CORS(app, supports_credentials=True)

logger = logger('MAIN')

Base = declarative_base()
engine = create_engine(DATABASE_PATH, encoding='latin1')

Base.metadata.create_all(engine)
Base.metadata.bind = engine

SESSION = None


@app.before_first_request
def before_first_request():
    """
    Подключимся перед первым запросом и создаем схемы
    """
    global SESSION
    DBSession = sessionmaker(bind=engine)
    SESSION = DBSession()


@app.before_request
def make_session_permanent():
    """
    Установка времени жизни сессии
    """
    session.permanent = True
    app.permanent_session_lifetime = dt.timedelta(hours=24)
    session.modified = True


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


@app.route('/api/fuzzyops/find', methods=["POST"])
def api_find():
    data = request.get_json(force=True)
    firstCategory = data.get('firstCategory')

    if firstCategory is None:
        return jsonify({"status": "error"})

    try:
        firstCategory = int(firstCategory)
        if firstCategory == 0:
            return jsonify(create_file)
        elif firstCategory == 1:
            return jsonify(fuzzy_logic)
    except Exception as e:
        logger.error(f'[ERROR]: {e}')
        return jsonify({'status': 'error', 'msg': str(e)})


@app.route('/api/fuzzyops/byAlias/<alias>', methods=["GET"])
def get_by_alias(alias):
    print('in')
    if alias == 'ForFuzzyLogic':
        return jsonify(ForFuzzyLogic)
    elif alias == 'ForDefuzz':
        return jsonify(ForDefuzz)
    elif alias == 'ForFuzzyOps':
        return jsonify(ForFuzzyOps)

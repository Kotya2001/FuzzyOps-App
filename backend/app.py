from config import DATABASE_PATH, Configuration
from database import create_obj, get_user_by_login

import datetime as dt

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from flask import Flask, jsonify, session, request
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Configuration)
CORS(app, supports_credentials=True)

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


@app.route('/registration', methods=['POST'])
def registration():
    """
    Функция для регистрации пользователей

    :return: response, status of request
    """
    data = request.get_json(force=True)

    try:
        isExist = get_user_by_login(data['email'])
        if isExist:
            return jsonify({'status': 'error', 'msg': 'Пользователь уже существует'})
        create_obj(data, 'user')
        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'status': 'error', 'msg': str(e)})

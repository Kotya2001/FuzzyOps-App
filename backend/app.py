from crypt import methods
from lib2to3.pgen2 import token
from config import DATABASE_PATH, Configuration
from logger import logger
from database import create_obj, get_user_by_login, generate_jwt_token
from utils import generate_secrete_key

import datetime as dt

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from flask import Flask, jsonify, abort, request, session
from flask_cors import CORS

import jwt

app = Flask(__name__)
app.config.from_object(Configuration)
CORS(app, supports_credentials=True)

logger = logger('MAIN')

Base = declarative_base()
engine = create_engine(DATABASE_PATH, encoding='latin1')

Base.metadata.create_all(engine)
Base.metadata.bind = engine

SESSION = None


def authorization(func):
    def inner(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return abort(403)
        
        try:
            token_data = jwt.decode(token, Configuration.JWT_SECRET_KEY, algorithm="HS256", 
            options={"verify_signature": False})

            curr_user = get_user_by_login(token_data['email'], get_row_obj=True)
        
        except Exception as e:
            logger.error(f'[ERROR]: {e}')
            return abort(403)
        
        return func(curr_user, *args, **kwargs)        

    inner.__name__ = func.__name__
    return inner


@app.before_first_request
def before_first_request():
    """
    Подключимся перед первым запросом и создаем схемы
    """
    global SESSION
    DBSession = sessionmaker(bind=engine)
    SESSION = DBSession()


# @app.before_request
# def make_session_permanent():
#     """
#     Установка времени жизни сессии
#     """
#     session.permanent = True
#     app.permanent_session_lifetime = dt.timedelta(hours=24)
#     session.modified = True


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
    email, password = data.get('email', ''), data.get('password', '')

    try:
        logger.debug('Got data for registration')
        # проверка на корректность ввода данных
        if email == '' or password == '':
            logger.info('Not correct data')
            return jsonify({'status': 'error', 'msg': 'Некорректные данные'})

        isExist = get_user_by_login(email)
        # проверка на уникальность логина
        if isExist:
            logger.info('User already exist')
            return jsonify({'status': 'error', 'msg': 'Пользователь уже существует'})

        create_obj({'email': email, 'password': password}, 'user')

        logger.info('User was created')
        return jsonify({'status': 'ok', 'msg': 'registered'})
    except Exception as e:
        logger.error(f'[ERROR]: {e}')
        return jsonify({'status': 'error', 'msg': str(e)})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    email, password = data.get('email', ''), data.get('password', '')

    try:
        logger.debug('Got data for authorization')
        if email == '' or password == '':
            logger.info('Not correct data')
            return jsonify({'status': 'error', 'msg': 'Некорректные данные'})

        user = get_user_by_login(email, get_row_obj=True)
        if user is None:
            logger.info('User doe not exist')
            return jsonify({'status': 'error', 'msg': 'Пользователя не существует'})

        if not user.check_password(password):
            logger.info('Not correct password')
            return jsonify({'status': 'error', 'msg': 'Неверный пароль'})

        jwt_token = generate_jwt_token(user.Id, email, Configuration.JWT_SECRET_KEY)

        logger.info('token adn secret key were written in session successfully')
        return jsonify({'status': 'ok', 'msg': 'ok', 'jwt_token': jwt_token})
    except Exception as e:
        logger.error(f'[ERROR]: {e}')
        return jsonify({'status': 'error', 'msg': str(e)})





@app.route('/main', methods=['POST'])
@authorization
def main(curr_user):
    return jsonify({'ok': 'ok'})

from config import DATABASE_PATH, Configuration
from logger import logger
from database import create_obj, get_user_by_login, generate_tokens

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
            logger.info('User does not exist')
            return jsonify({'status': 'error', 'msg': 'Пользователя не существует'})

        if not user.check_password(password):
            logger.info('Not correct password')
            return jsonify({'status': 'error', 'msg': 'Неверный пароль'})
        uid = user.Id

        user_tokens = get_user_by_login(email, table='token', user_id=user.Id, get_row_obj=True)
        if user_tokens is not None:
            access_token, refresh_token = user_tokens.access_token, user_tokens.refresh_token
            session['user'] = {'access_token': access_token, 'refresh_token': refresh_token, 'uid': uid}
            response = {'uid': uid}
        else:
            access_token, refresh_token = generate_tokens(), generate_tokens()
            create_obj({'access_token': access_token, 'refresh_token': refresh_token, 'user_id': uid,
                        'dt_created': dt.datetime.now()}, 'token')
            response = {'uid': uid}
            session['user'] = {'access_token': access_token, 'refresh_token': refresh_token, 'uid': uid}

        logger.info('token adn secret key were written in session successfully')
        # print(session)
        return jsonify({'status': 'ok', 'msg': 'ok', 'tokens': response})
    except Exception as e:
        logger.error(f'[ERROR]: {e}')
        return jsonify({'status': 'error', 'msg': str(e)})

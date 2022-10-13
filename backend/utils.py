"""
Вспомогательные функциия для сервиса
"""
from logger import logger
from database import get_obj_by_n, generate_tokens, update_tokens
from config import TOKEN_UPDATE_TIME

from flask import session, abort
from datetime import datetime

logger = logger('utils')


def user_access(func):
    def inner(*args, **kwargs):
        try:

            user = session.get('user', None)
            if user is None:
                logger.info('Not accessed access')
                return abort(401)

            access_token = user.get('access_token')
            refresh_token = user.get('refresh_token')
            uid = user.get('uid')

            saved_tokens = get_obj_by_n(uid, 'token', get_row_obj=True)
            # Проверка токена в сессии с токеном в таблице
            if access_token == saved_tokens.access_token:
                logger.info('Access token is right')

                diff = datetime.now() - saved_tokens.dt_created
                diff_seconds = diff.seconds

                # Проверяем, что токен не просроче
                if diff_seconds <= TOKEN_UPDATE_TIME:
                    logger.info('token is available')
                    return func(*args, **kwargs)
                else:
                    # Если токен просрочен, то обновим access token
                    access_token = generate_tokens()
                    time_created = datetime.now()
                    update_access_token = {'access_token': access_token, 'dt_created': time_created}

                    # обновим access token в бд
                    update_tokens(uid, update_access_token)

                    logger.info('access token were updated')

                    if refresh_token == saved_tokens.refresh_token:

                        new_access_token = generate_tokens()
                        new_refresh_token = generate_tokens()
                        new_time_created = datetime.now()
                        update_all_tokens = {'access_token': new_access_token,
                                             'refresh_token': new_refresh_token,
                                             'dt_created': new_time_created}

                        # обновим оба
                        update_tokens(uid, update_all_tokens)
                        logger.info('all tokens were updated')

                        update_all_tokens.pop('dt_created')
                        new_cookies = update_all_tokens
                        new_cookies['user_id'] = uid
                        session['user'] = new_cookies

                        return func(*args, **kwargs)
                    else:
                        logger.info('Error 403 refresh tokens is incorrect')
                        return abort(403)

            else:
                logger.info('Error 403 access tokens is incorrect')
                return abort(403)
        except Exception as e:
            logger.error(f'Exception: {e}')
            return abort(403)

    inner.__name__ = func.__name__
    return inner













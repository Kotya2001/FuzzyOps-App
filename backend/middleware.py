from config import Configuration
from logger import logger
from werkzeug.wrappers import Request, Response, ResponseStream
import jwt

logger = logger('Middleware')


class middleware:

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        try:
            request = Request(environ)
            if request.path in ('/login', '/registration'):
                return self.app(environ, start_response)

            token = request.headers.get('Authorization', None)
            if not token:
                res = Response(u'Ошибка авторизации', status=401)

                return res(environ, start_response)

            decoded_token = jwt.decode(token, Configuration.JWT_SECRET_KEY, algorithms="HS256",
                                       options={"verify_signature": False})
            environ['user'] = decoded_token
            return self.app(environ, start_response)
        except Exception as e:
            logger.error(f'[ERROR]: {e}')
            res = Response(u'Ошибка авторизации', status=403)
            return res(environ, start_response)

from config import DATABASE_PATH
from logger import logger

from sqlalchemy import Column, Integer, String, ForeignKey, DATETIME
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

import secrets

logger = logger('DB')

engine = create_engine(DATABASE_PATH, connect_args={'check_same_thread': False}, encoding='latin1')
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

session = scoped_session(Session)
Base = declarative_base()
Base.query = session.query_property()


class UsersData(Base):
    __tablename__ = 'users'
    Id = Column(Integer, primary_key=True)
    email = Column(String(50), unique=True)
    password = Column(String(50), nullable=False)

    def get_info(self):
        return ({
            'id': self.Id,
            'email': self.email
        })

    def check_password(self, password):
        user_hash = self.password
        return check_password_hash(user_hash, password)


class Tokens(Base):
    __tablename__ = 'tokens'
    Id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.Id'))
    access_token = Column(String(100), unique=True)
    refresh_token = Column(String(100), unique=True)
    dt_created = Column(DATETIME)

    def get_info(self):
        return ({
            'user_id': self.user_id,
            'access_token': self.access_token,
            'refresh_token': self.refresh_token,
            'dt_created': self.dt_created
        })


def create_obj(hash_map: dict, objtype: str) -> Base:
    if objtype == 'user':
        hash_map['password'] = generate_password_hash(hash_map['password'])
        new_obj = UsersData(
            email=hash_map.get('email'),
            password=hash_map.get('password')
        )
    elif objtype == 'token':
        new_obj = Tokens(
            user_id=hash_map.get('user_id'),
            access_token=hash_map.get('access_token'),
            refresh_token=hash_map.get('refresh_token'),
            dt_created=hash_map.get('dt_created')
        )

    else:
        raise KeyError('Not valid type')

    try:
        session.add(new_obj)
        session.commit()
        return new_obj
    except Exception as e:
        session.rollback()
        logger.error(f'Exception on creating object: {e}')
        raise


def get_user_by_login(login: str, get_row_obj=False, table: str = 'user', user_id=None):
    try:
        if table == 'user':
            user = session.query(UsersData).filter_by(email=login).one()
            if get_row_obj:
                return user
            return True
        elif table == 'token':
            user = session.query(Tokens).filter_by(user_id=user_id).one()
            if get_row_obj:
                return user
            return True
    except Exception:
        if get_row_obj:
            return None
        return False


def generate_tokens(n: int = 100) -> str:
    return secrets.token_urlsafe(n)


def get_obj_by_n(Id: int, obj_type: str, get_row_obj=False):
    try:
        if obj_type == 'user':
            obj = session.query(UsersData).filter_by(Id=Id).one()
        elif obj_type == 'token':
            obj = session.query(Tokens).filter_by(user_id=Id).one()
        else:
            raise KeyError(f'Передан несуществующий object type')

        if get_row_obj:
            return obj
        return obj.get_info()
    except Exception as e:
        logger.error(f'Exception: {e}')
        return None


def update_tokens(user_id: int, hashmap: dict) -> None:
    obj = session.query(Tokens).filter_by(user_id=user_id).one()
    if 'refresh_token' not in hashmap:
        obj.access_token = hashmap['access_token']
        obj.dt_created = hashmap['dt_created']
    else:
        obj.access_token = hashmap['access_token']
        obj.dt_created = hashmap['dt_created']
        obj.refresh_token = hashmap['refresh_token']

    session.add(obj)
    session.commit()


Base.metadata.create_all(engine)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

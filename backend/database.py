from config import DATABASE_PATH

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON, LargeBinary, \
    Boolean, or_, Float
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker, relationship, scoped_session
from sqlalchemy import create_engine

from paginate_sqlalchemy import SqlalchemyOrmPage

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

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
    access_token = Column(String(100), unique=True)
    refresh_token = Column(String(100), unique=True)
    data_time = Column(DateTime())
    user_id = Column(Integer(), ForeignKey('users.Id'), nullable=False)

    def get_info(self):
        return ({
            'id': self.Id,
            'access_token': self.access_token,
            'refresh_token': self.refresh_token,
            'data_time': self.data_time,
            'user_id': self.user_id
        })


def create_obj(hash_map: dict, objtype: str) -> Base:

    if objtype == 'user':
        hash_map['password'] = generate_password_hash(hash_map['password'])
        new_obj = UsersData(
            email=hash_map.get('email'),
            password=hash_map.get('password')
        )

    else:
        raise KeyError('Not valid type')

    try:
        session.add(new_obj)
        session.commit()
        return new_obj
    except Exception as e:
        session.rollback()
        # logger.error(f'Exception on creating object: {e}')
        raise


def get_user_by_login(login: str):
    try:
        user = session.query(UsersData).filter_by(email=login).one()
        return True
    except Exception:
        return False


Base.metadata.create_all(engine)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


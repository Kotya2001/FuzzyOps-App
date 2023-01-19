from app import app
from flask import jsonify


@app.route('/')
def page_main():
    """
    Начальная страница
    """
    return jsonify({'status': 'ok', 'msg': 'Работаем'})


@app.route('/ping')
def page_ping():
    """
    Проверка работоспособности сервиса
    """
    return jsonify({'status': 'ok', 'msg': 'Работаем'})

"""
Исполняемый файл, точка входа
"""
from app import app
from config import SERVER_PORT, SERVER_HOST, DEBUG
# производим запуск приложения в зависимоти от режима работы
if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=DEBUG)

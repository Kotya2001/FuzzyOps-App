"""
Исполняемый файл, точка входа
"""


from transport import app
from config import SERVER_PORT, SERVER_HOST

if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)

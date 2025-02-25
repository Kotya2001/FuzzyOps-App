"""
Исполняемый файл, точка входа
"""
# import os
# import sys
# from pathlib import Path
# root_path = Path(os.path.abspath(__file__))
# src_dir = root_path.parents[0]
# sys.path.append(src_dir.__str__())

from transport import app
from config import SERVER_PORT, SERVER_HOST, DEBUG

# root_path = Path(os.path.abspath(__file__))
# src_dir = root_path.parents[3]
# print(src_dir)
# sys.path.append(src_dir.__str__())

# производим запуск приложения в зависимоти от режима работы
if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=DEBUG)

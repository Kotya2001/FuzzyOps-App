from app import app
from backend.service import create_file
from backend.utils import create_response
from flask_api import status


@app.route('/main/download_file/<file_hash>', methods=["GET"])
def download_file(file_hash: str):
    """
    Функция для скачивания файла с нечеткими вычислениями
    """

    file = create_file(file_hash)
    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data={"file": file}
    )
    return response

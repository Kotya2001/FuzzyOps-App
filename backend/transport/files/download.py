from app import app
from service import create_file
from utils import create_response
from flask_api import status


@app.route('/main/download_file/<file_hash>', methods=["GET"])
def download_file(file_hash: str):
    """
    Функция для скачивания файла с нечеткими вычислениями
    """

    file = create_file(file_hash)
    if file:
        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data={"file": file, "file_hash": file_hash}
        )
        return response
    response = create_response(
        status=status.HTTP_409_CONFLICT,
        message="error",
        data={}
    )
    return response

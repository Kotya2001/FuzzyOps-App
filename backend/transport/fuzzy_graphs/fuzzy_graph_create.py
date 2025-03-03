from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import create_fuzzy_graph
from flask import request
from flask_api import status
from hashlib import sha256


@app.route('/main/fuzzyGraph/create', methods=['POST'])
def fuzzy_graph_create():
    """
    Функция для создания нечеткого графа
    """
    (full_data, error) = parse_json_from_request(request)

    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    
    error, msg = validate_data(full_data, "Создание нечеткого графа")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response

    hash_str = str(full_data) + 'create_graph'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    msg = create_fuzzy_graph(full_data, file_hash)

    if msg:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=msg,
            data=None
            )
        return response

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data=file_hash
    )
    return response

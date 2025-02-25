from app import app
from utils import Message, create_response, parse_json_from_request
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
    graph_settings = full_data["graphSettings"]
    graph_data = full_data["graph_data"]
    hash_str = str(full_data) + 'create_graph'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    create_fuzzy_graph(graph_data, graph_settings, file_hash)
    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data=file_hash
    )
    return response

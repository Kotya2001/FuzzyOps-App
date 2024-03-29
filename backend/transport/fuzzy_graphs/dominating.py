from app import app
from backend.utils import Message, create_response, parse_json_from_request
from backend.service import get_graph, check_dominating_set
from flask import request
from flask_api import status


@app.route('/main/fuzzyGraph/Dominating/check', methods=['POST'])
def check_dominating():
    """
    Проверка на множест на доминацию
    """
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    file_hash = full_data["fileHash"]
    dominating = full_data["dominating"]

    err, graph = get_graph(file_hash)
    if not err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message="Граф отсутствует, необходимо создать",
            data=None
        )
        return response

    dominating_set = [int(i) for i in dominating.split()]
    res, err = check_dominating_set(graph, dominating_set)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response
    else:
        response = create_response(
            status=status.HTTP_200_OK,
            message="ok",
            data=res
        )
        return response
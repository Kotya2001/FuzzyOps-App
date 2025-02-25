from app import app
from utils import Message, create_response, parse_json_from_request
from service import get_assignment_result
from flask import request
from flask_api import status


@app.route('/main/fuzzyGraph/Assignment/Get', methods=['POST'])
def fuzzy_assignment():
    """
    Функция для решения задачи о назначении
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
    tasks, workers, fuzzy_costs = full_data["tasks"], full_data["workers"], full_data["fuzzyCosts"]

    result, error = get_assignment_result(graph_settings, tasks, workers, fuzzy_costs)

    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=error,
            data=None
        )
        return response
    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data=result
    )
    return response

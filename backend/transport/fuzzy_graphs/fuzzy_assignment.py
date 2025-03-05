from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_assignment_result, get_graph
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
    
    error, msg = validate_data(full_data, "assignment")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    
    file_hash = full_data["fileHash"]
    tasks, workers, fuzzy_costs = full_data["tasks"], full_data["workers"], full_data["fuzzyCosts"]

    graph_data, err = get_graph(file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response

    result, error = get_assignment_result(graph_data, tasks, workers, fuzzy_costs)


    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=error,
            data=None
        )
        return response
    else:
        result["assignments"] = [{"worker": elem[0], "task": elem[1]} for elem in result["assignments"]]
        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=result
        )
        return response

from app import app
from utils import Message, create_response, parse_json_from_request
from service import get_graph, check_dominating_set, get_any_dominating, get_dominating
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

    graph_data, err = get_graph(file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response

    dominating_set = [int(i) for i in dominating.split()]
    res, err = check_dominating_set(graph_data, dominating_set)
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

@app.route('/main/fuzzyGraph/AnyDominating/Get', methods=['POST'])
def get_any_dominating_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    file_hash = full_data["fileHash"]
    graph_data, err = get_graph(file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    res, err = get_any_dominating(graph_data)
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
            data={"dominating_set": res}
        )
        return response

@app.route('/main/fuzzyGraph/Dominating/Get', methods=['POST'])
def get_dominating_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    file_hash = full_data["fileHash"]
    fnum = full_data["domitatingSet"]
    graph_data, err = get_graph(file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    bounds = [int(i) for i in fnum.split()]
    res, err = get_dominating(graph_data, bounds)
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
            data={"dominating_set": res}
        )
        return response

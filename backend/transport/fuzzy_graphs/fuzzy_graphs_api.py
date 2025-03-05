from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import create_fuzzy_graph, get_graph, calc_shortest_path, \
    calc_clusters, check_dominating_set, get_any_dominating, get_dominating, get_assignment_result
from flask import request
from flask_api import status
from hashlib import sha256


@app.route('/api/fgraph/create', methods=['POST'])
def fuzzy_graph_api_create():
    """
    Функция для создания нечеткого графа
    """
    if (request.method != "POST"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод POST",
            data=None
        )
        return response, 404
    
    (full_data, error) = parse_json_from_request(request)

    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 400
    
    error, msg = validate_data(full_data, "create_graph_api")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    full_data["graphSettings"]["edgeNumberType"] = "triangle"
    hash_str = str(full_data) + 'create_graph'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    msg = create_fuzzy_graph(full_data, file_hash, is_api=True)

    if msg:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=msg,
            data=None
            )
        return response, 409

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data=file_hash
    )
    return response, 200


@app.route('/api/fgraph/shortest_path/<key>', methods=['GET'])
def fuzzy_graph_api_shortest_path(key: str):
    
    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 404
    
    error, msg = validate_data(full_data, "shortest_path_api")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    path = full_data["path"]
    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response, 409
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400
    start_end = [int(i) for i in path.split()]
    res, err = calc_shortest_path(graph_data, start_end[0], start_end[1])
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response, 409
    else:
        resp = {"path": res["path"], "values": res['len']._value}
        response = create_response(
            status=status.HTTP_200_OK,
            message="ok",
            data=resp
        )
        return response, 200

@app.route('/api/fgraph/clusters/<key>', methods=['GET'])
def fuzzy_graph_api_clusters(key: str):
    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 404
    error, msg = validate_data(full_data, "clusters_api")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    cluster = full_data["cluster"]
    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response, 409
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400
    res, err = calc_clusters(graph_data, cluster)
    n_clusters = set(res)
    result = {"clusters": {str(i): [j for j in range(len(res)) if i == res[j]] for i in n_clusters}}
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
            data=result
        )
        return response
    

@app.route('/api/fgraph/is_dominating/<key>', methods=['GET'])
def fuzzy_graph_api_is_dominating(key: str):
    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 404
    error, msg = validate_data(full_data, "is_dominating")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    dominating = full_data["dominating"]
    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response, 409
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400
    res, err = check_dominating_set(graph_data, dominating, is_api=True)
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

@app.route('/api/fgraph/any_dominating/<key>', methods=['GET'])
def fuzzy_graph_api_any_dominating(key: str):
    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400
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

@app.route('/api/fgraph/dominating/<key>', methods=['GET'])
def fuzzy_graph_api_dominating(key: str):
    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 404
    error, msg = validate_data(full_data, "dominating")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400
    res, err = get_dominating(graph_data, full_data["values"])
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
    

@app.route('/api/fgraph/assignment/<key>', methods=['GET'])
def fuzzy_assignment_api(key):
    """
    Функция для решения задачи о назначении
    """

    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    
    error, msg = validate_data(full_data, "assignment_api")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    
    tasks, workers, fuzzy_costs = full_data["tasks"], full_data["workers"], full_data["fuzzyCosts"]

    graph_data, err = get_graph(key)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    
    error, msg = validate_data(graph_data, "check_graph")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле, возможно перепутили ключи",
            data=None
        )
        return response, 400

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
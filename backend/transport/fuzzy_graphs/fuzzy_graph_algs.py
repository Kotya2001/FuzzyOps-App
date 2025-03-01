from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_graph, calc_shortest_path, calc_clusters
from flask import request
from flask_api import status


@app.route('/main/fuzzyGraph/shortestPath/Get', methods=['POST'])
def get_shortest_path():
    """
    Получение наикратчайшего маршрута
    """
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    
    print(full_data)
    
    error, msg = validate_data(full_data, "shortest_path")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    

    file_hash = full_data["fileHash"]
    path = full_data["path"]

    graph_data, err = get_graph(file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=graph_data
        )
        return response
    start_end = [int(i) for i in path.split()]
    res, err = calc_shortest_path(graph_data, start_end[0], start_end[1])
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=None
        )
        return response
    else:
        resp = {"path": res["path"], "values": res['len']._value}
        response = create_response(
            status=status.HTTP_200_OK,
            message="ok",
            data=resp
        )
        return response

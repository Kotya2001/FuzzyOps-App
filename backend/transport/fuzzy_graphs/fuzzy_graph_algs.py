from app import app
from backend.utils import Message, create_response, parse_json_from_request
from backend.service import get_graph, calc_shortest_path, calc_clusters
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
    file_hash = full_data["fileHash"]
    path = full_data["path"]

    err, graph = get_graph(file_hash)
    if not err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message="Граф отсутствует, необходимо создать",
            data=None
        )
        return response

    start_end = [int(i) for i in path.split()]
    res, err = calc_shortest_path(graph, start_end[0], start_end[1])
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

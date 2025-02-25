from app import app
from utils import Message, create_response, parse_json_from_request
from service import get_graph, calc_clusters
from flask import request
from flask_api import status


@app.route('/main/fuzzyGraph/Cluster/Get', methods=['POST'])
def get_cluster():
    """
    Разбиение на кластеры
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
    cluster = int(full_data["cluster"])

    err, graph = get_graph(file_hash)
    if not err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message="Граф отсутствует, необходимо создать",
            data=None
        )
        return response

    res, err = calc_clusters(graph, cluster)
    n_clusters = set(res)
    result = {"Кластер" + " " + str(i): [j for j in range(len(res)) if i == res[j]] for i in n_clusters}
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
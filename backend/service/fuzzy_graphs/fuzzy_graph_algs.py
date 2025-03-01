from database import get_cache
import base64
import pickle

from app import logger

from fuzzyops.graphs.algorithms.transport import shortest_path
from fuzzyops.graphs.algorithms.factoring import mle_clusterization_factors
from fuzzyops.graphs.algorithms.dominating import is_dominating
from fuzzyops.graphs.fuzzgraph import FuzzyGraph


def get_graph(file_hash: str):
    try:
        f = get_cache(file_hash)
    except Exception as e:
        logger.error(f'Error while setting cache in Redis: {e}')
        return {}, "Ошибка подключения к базе Redis"
    
    return f, ""
    
    # f = get_cache(file_hash)
    # if not f:
    #     return False, None
    # else:
    #     data = f["result"]
    #     graph = base64.b64decode(data)
    #     graph = pickle.loads(graph)
    #     return True, graph


def _make_graph(data: dict):

    graph_settings = data["graphSettings"]
    graph_data = data["graph_data"]

    edge_type = graph_settings["edgeType"]

    edge_number_math_type = graph_settings["edgeNumberMathType"]
    edge_number_eq_type = graph_settings["edgeNumberEqType"]

    graph = FuzzyGraph(edge_type=edge_type,
                       edge_number_eq_type=edge_number_eq_type, edge_number_math_type=edge_number_math_type)
    max_node_start = max([max(e["start"], e["end"]) for e in graph_data])


    for _ in range(max_node_start + 1):
        graph.add_node()

    for edge in graph_data:
        graph.add_edge(edge["start"], edge["end"], edge["values"])
    
    
    return graph


def calc_shortest_path(data, start: int, end: int) -> dict:
    try:
        graph = _make_graph(data)
    except Exception as e:
        return {}, str(e)

    try:
        res = shortest_path(graph, start, end)
        print(res)
        return res, ""
    except Exception as e:
        return {}, str(e)


def calc_clusters(graph, n_clusters: int) -> list:
    try:
        res = mle_clusterization_factors(graph, n_clusters)
        return res, ""
    except Exception as e:
        return [], str(e)


def check_dominating_set(graph, dominating_set: list[int]) -> bool:
    try:
        is_dom = is_dominating(graph, set(dominating_set))
        result = "Доминирующее множество" if is_dom else "Множество недоминирующее"
        return result, ""
    except Exception as e:
        return "", str(e)

from backend.database import get_cache
import base64
import pickle

from fuzzyops.graphs.algorithms.transport import shortest_path
from fuzzyops.graphs.algorithms.factoring import mle_clusterization_factors
from fuzzyops.graphs.algorithms.dominating import is_dominating


def get_graph(file_hash: str):
    f = get_cache(file_hash)
    if not f:
        return False, None
    else:
        data = f["result"]
        graph = base64.b64decode(data)
        graph = pickle.loads(graph)
        return True, graph


def calc_shortest_path(graph, start: int, end: int) -> dict:
    try:
        res = shortest_path(graph, start, end)
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

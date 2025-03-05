from database import get_cache
import base64
import pickle

from app import logger

from fuzzyops.graphs.algorithms.transport import shortest_path
from fuzzyops.graphs.algorithms.factoring import mle_clusterization_factors
from fuzzyops.graphs.algorithms.dominating import is_dominating, dominating_set, fuzzy_dominating_set
from fuzzyops.graphs.fuzzgraph import FuzzyGraph
from fuzzyops.sequencing_assignment import FuzzySASolver


def get_graph(file_hash: str):
    try:
        f = get_cache(file_hash)
    except Exception as e:
        logger.error(f'Error while setting cache in Redis: {e}')
        return {}, "Ошибка подключения к базе Redis"
    
    if not f:
        return {}, "Данных нет в кэше, создайте граф заново"
    
    return f, ""


def _make_graph(data: dict):

    graph_settings = data["graphSettings"]
    graph_data = data["graph_data"]

    edge_type = graph_settings["edgeType"]

    edge_number_math_type = graph_settings["edgeNumberMathType"]
    edge_number_eq_type = graph_settings["edgeNumberEqType"]

    graph = FuzzyGraph(edge_type=edge_type,
                       edge_number_eq_type=edge_number_eq_type,
                       edge_number_math_type=edge_number_math_type)
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
        return res, ""
    except Exception as e:
        return {}, str(e)


def calc_clusters(data, n_clusters: int) -> list:

    try:
        graph = _make_graph(data)
    except Exception as e:
        return {}, str(e)

    try:
        res = mle_clusterization_factors(graph, n_clusters)
        return res, ""
    except Exception as e:
        return [], str(e)


def check_dominating_set(data, dominating_set: list[int], is_api: bool = False):
    try:
        graph = _make_graph(data)
    except Exception as e:
        return "", str(e)
    
    try:
        if not is_api:
            is_dom = is_dominating(graph, set(dominating_set))
            result = "Доминирующее множество" if is_dom else "Множество недоминирующее"
            return result, ""
        else:
            is_dom = is_dominating(graph, set(dominating_set))
            result = {"is_dominating": is_dom}
            return result, ""
    except Exception as e:
        return "", str(e)

def get_any_dominating(data):
    try:
        graph = _make_graph(data)
    except Exception as e:
        return [], str(e)
    
    try:
        res = dominating_set(graph)
        return list(res), ""

    except Exception as e:
        return [], str(e)
    
def get_dominating(data, values):
    try:
        graph = _make_graph(data)
    except Exception as e:
        return [], str(e)
    
    try:
        res = fuzzy_dominating_set(graph, values)
        return list(res), ""

    except Exception as e:
        return [], str(e)
    

def get_assignment_result(graph_data,
                          tasks: list[str],
                          workers: list[str],
                          fuzzy_costs: list[dict]):

    graph_settings = graph_data["graphSettings"]



    graph = FuzzyGraph(
        node_number_math_type="min",
        node_number_eq_type="max",
        edge_number_math_type=graph_settings["edgeNumberMathType"],
        edge_number_eq_type=graph_settings["edgeNumberEqType"],
    )

    solver = FuzzySASolver()
    solver.load_graph(graph)

    solver.load_tasks_workers(tasks, workers)
    for _, value in enumerate(fuzzy_costs):
        solver.load_task_worker_pair_value(value["task"], value["worker"], value["fuzzyCost"])

    try:
        result = solver.solve()
        r = result['cost']._value
        result['cost'] = r
        return result, ""
    except Exception as e:
        return {}, str(e)
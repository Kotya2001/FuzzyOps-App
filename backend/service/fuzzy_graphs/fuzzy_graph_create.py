from fuzzyops.graphs.fuzzgraph.graph import FuzzyGraph
from backend.database import set_cache, get_cache
from backend.utils import edge_types, edge_number_eq_types, edge_number_math_types
import pickle
import base64


def create_fuzzy_graph(graph_data: list[dict], graph_settings: dict,
                       file_hash: str) -> None:
    f = get_cache(file_hash)

    if not f:

        edge_type = edge_types[graph_settings["edgeType"]]

        edge_number_math_type = edge_number_math_types[graph_settings["edgeNumberMathType"]]
        edge_number_eq_type = edge_number_eq_types[graph_settings["edgeNumberEqType"]]

        graph = FuzzyGraph(edge_type=edge_type,
                           edge_number_eq_type=edge_number_eq_type, edge_number_math_type=edge_number_math_type)
        max_node_start = max([max(e["start"], e["end"]) for e in graph_data])

        for i in range(max_node_start + 1):
            graph.add_node()

        for edge in graph_data:
            graph.add_edge(edge["start"], edge["end"], edge["values"])

        pickled_graph = pickle.dumps(graph)
        encoded_graph = base64.b64encode(pickled_graph)
        set_cache(file_hash, {"result": encoded_graph.decode("utf-8")})

    else:
        return

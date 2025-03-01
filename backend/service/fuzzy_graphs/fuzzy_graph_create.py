# from fuzzyops.graphs.fuzzgraph.graph import FuzzyGraph
from database import set_cache, get_cache
from utils import edge_types, edge_number_eq_types, edge_number_math_types
from app import logger



def create_fuzzy_graph(full_data: dict,
                       file_hash: str) -> str:
    
    try:
        f = get_cache(file_hash)
    except Exception as e:
        logger.error(f'Error while setting cache in Redis: {e}')
        return "Ошибка подключения к базе Redis"
    

    if not f:
        graph_settings = full_data["graphSettings"]

        full_data["graphSettings"]["edgeType"] = edge_types[graph_settings["edgeType"]]
        full_data["graphSettings"]["edgeNumberMathType"] = edge_number_math_types[graph_settings["edgeNumberMathType"]]
        full_data["graphSettings"]["edgeNumberEqType"] = edge_number_eq_types[graph_settings["edgeNumberEqType"]]

        # edge_type = edge_types[graph_settings["edgeType"]]

        # edge_number_math_type = edge_number_math_types[graph_settings["edgeNumberMathType"]]
        # edge_number_eq_type = edge_number_eq_types[graph_settings["edgeNumberEqType"]]

        # graph = FuzzyGraph(edge_type=edge_type,
        #                    edge_number_eq_type=edge_number_eq_type, edge_number_math_type=edge_number_math_type)
        # max_node_start = max([max(e["start"], e["end"]) for e in graph_data])

        # for i in range(max_node_start + 1):
        #     graph.add_node()

        # for edge in graph_data:
        #     graph.add_edge(edge["start"], edge["end"], edge["values"])

        # pickled_graph = pickle.dumps(graph)
        # encoded_graph = base64.b64encode(pickled_graph)

        # set_cache(file_hash, {"result": encoded_graph.decode("utf-8")})
        try:
            set_cache(file_hash, full_data)
        except Exception as e:
            logger.error(f'Error while setting cache in Redis: {e}')
            return "Ошибка подключения к базе Redis"

    else:
        return ""

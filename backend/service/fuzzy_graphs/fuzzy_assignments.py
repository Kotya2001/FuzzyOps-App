from backend.utils import edge_number_eq_types, edge_number_math_types

from fuzzyops.graphs.fuzzgraph.graph import FuzzyGraph
from fuzzyops.sequencing_assignment.solver import FuzzySASolver


def get_assignment_result(graph_settings: dict,
                          tasks: list[str],
                          workers: list[str],
                          fuzzy_costs: list[dict]):
    edge_number_math_type = edge_number_math_types[graph_settings["edgeNumberMathType"]]
    edge_number_eq_type = edge_number_eq_types[graph_settings["edgeNumberEqType"]]

    graph = FuzzyGraph(
        node_number_math_type='min',
        node_number_eq_type="max",
        edge_number_math_type=edge_number_math_type,
        edge_number_eq_type=edge_number_eq_type,
    )

    solver = FuzzySASolver()
    solver.load_graph(graph)

    solver.load_tasks_workers(tasks, workers)
    for _, value in enumerate(fuzzy_costs):
        solver.load_task_worker_pair_value(value["task"], value["worker"], value["fuzzyCosts"])

    try:
        result = solver.solve()
        r = result['cost']._value
        result['cost'] = r
        return result, ""
    except Exception as e:
        return {}, str(e)

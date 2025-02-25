from fuzzyops.fuzzy_numbers import Domain
from fuzzyops.fuzzy_msa import fuzzy_pareto_solver, fuzzy_sum_solver


def _is_correct(t: str, rng: list) -> bool:
    if t == "triangular":
        if len(rng) == 3:
            return True
        return False
    elif t == "gauss":
        if len(rng) == 2:
            return True
        return False
    elif t == "trapezoidal":
        if len(rng) == 4:
            return True
        return False
    return False


def solve_msa_task(task_type: str, data: dict) -> tuple[str]:
    start, end, step = data["domain"]["start"], data["domain"]["stop"], data["domain"]["step"]
    domain = Domain((start, end, step), name="domain", method="minimax")
    num_type = data["numType"]
    matrix = data["data"]

    if task_type == "Граница Паретто":

        matrix_fuzzy_nums = [[] for _ in range(len(matrix))]

        for i in range(len(matrix)):
            for j in range(len(matrix[i])):
                d = matrix[i][j]
                is_correct = _is_correct(num_type, d['range'])
                if not is_correct:
                    return "", f"Некорректные данные {d['range']} для типа нечеткого числа {num_type}"
                domain.create_number(num_type, *d['range'], name=d['name'])
                matrix_fuzzy_nums[i].append(domain.get(d['name']))

        pareto = fuzzy_pareto_solver(matrix_fuzzy_nums)
        return str(pareto), ""
    else:
        matrix_w = []
        matrix_alt = [[] for _ in range(len(matrix["alternatives_scores"]))]
        for i in range(len(matrix["criteria_weights"])):
            d = matrix["criteria_weights"][i]
            is_correct = _is_correct(num_type, d['range'])
            if not is_correct:
                return "", f"Некорректные данные {d['range']} для типа нечеткого числа {num_type}"
            domain.create_number(num_type, *d['range'], name=d['name'])
            matrix_w.append(domain.get(d['name']))

        for i in range(len(matrix_alt)):
            for j in range(len(matrix["alternatives_scores"][i])):
                d = matrix["alternatives_scores"][i][j]
                is_correct = _is_correct(num_type, d['range'])
                if not is_correct:
                    return "", f"Некорректные данные {d['range']} для типа нечеткого числа {num_type}"
                domain.create_number(num_type, *d['range'], name=d['name'])
                matrix_alt[i].append(domain.get(d['name']))

        result = fuzzy_sum_solver(matrix_w, matrix_alt)
        return str(result), ""

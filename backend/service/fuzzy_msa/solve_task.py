from fuzzyops.fuzzy_numbers import Domain
from fuzzyops.fuzzy_msa import fuzzy_pareto_solver, fuzzy_sum_solver, fuzzy_pairwise_solver, fuzzy_hierarchy_solver


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
    matrix = data.get("data")

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
        res = [[pareto[i][j].defuzz() for j in range(len(pareto[j]))] for i in range(len(pareto))]
        return {"result": res}, ""
    elif task_type == "Взвешенная сумма":
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
        return {"result": [res.defuzz() for res in result]}, ""
    elif task_type == "Нечеткие попарные сравнения":
        alternatives, criteria = data["alternatives"], data["criteria"]
        pairs = data["pairwise_matrices"]
        p = []
        for i in range(len(pairs)):
            p_i = []
            for j in range(len(pairs[i])):
                p_j = []
                for k in range(len(pairs[i][j])):
                    elem = pairs[i][j][k]
                    is_correct = _is_correct(num_type, elem['range'])
                    if not is_correct:
                        return "", f"Некорректные данные {elem['range']} для типа нечеткого числа {num_type}"
                    domain.create_number(num_type, *elem['range'], name=elem['name'])
                    p_j.append(domain.get(elem['name']))
                p_i.append(p_j)
            p.append(p_i)
        result = fuzzy_pairwise_solver(alternatives, criteria, p)
        return {"result": [(elem[0], elem[1].defuzz()) for elem in result]}, ""
    else:
        cw = data["criteria_weights"]
        c_w = []
        for i in range(len(cw)):
            c_w_i = []
            for j in range(len(cw[i])):
                elem = cw[i][j]
                is_correct = _is_correct(num_type, elem['range'])
                if not is_correct:
                    return "", f"Некорректные данные {elem['range']} для типа нечеткого числа {num_type}"
                domain.create_number(num_type, *elem['range'], name=elem['name'])
                c_w_i.append(domain.get(elem['name']))
            c_w.append(c_w_i)

        
        pairs = data["comparassions"]
        p = []
        for i in range(len(pairs)):
            p_i = []
            for j in range(len(pairs[i])):
                p_j = []
                for k in range(len(pairs[i][j])):
                    elem = pairs[i][j][k]
                    is_correct = _is_correct(num_type, elem['range'])
                    if not is_correct:
                        return "", f"Некорректные данные {elem['range']} для типа нечеткого числа {num_type}"
                    domain.create_number(num_type, *elem['range'], name=elem['name'])
                    p_j.append(domain.get(elem['name']))
                p_i.append(p_j)
            p.append(p_i)
        hierarchy_result = fuzzy_hierarchy_solver(c_w, p)
        return {"result": [elem.defuzz() for elem in hierarchy_result]}, ""
        
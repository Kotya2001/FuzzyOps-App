from backend.database import set_cache, get_cache

from fuzzyops._domain import Domain
from fuzzyops.fuzzify.mf import memberships

from typing import Union, List
import numpy as np


def calc_number_with_fuzzy_number(file_hash: str, n: Union[int, float],
                                  operation: str, is_paginate: bool):
    error = False

    f = get_cache(file_hash)
    if not f:
        error = True
        return error, {}
    if is_paginate:
        return error, f

    x = np.array(f['x'])
    args = f['args']
    type_of_number = f['type']

    domain = Domain(x)
    fnum = domain.create_number(memberships[type_of_number], *args)

    if operation == "+":
        fnum += n
    elif operation == "-":
        fnum -= n
    elif operation == "*":
        fnum *= n
    else:
        error = True
        return error, {}

    defuz_value = np.round(fnum.defuzz(), 1)
    new_res = {"result": {"result": fnum.values.tolist()},
               "x": fnum.domain.x.tolist(),
               "defuz_value": defuz_value,
               "args": args,
               "type": type_of_number}
    set_cache(file_hash, new_res)
    return error, new_res


def calc_fnum_with_fnum(file_hash: str,
                        operation: str, is_paginate: bool,
                        unity_number: List[float], type_of_number: str,
                        new_x: np.ndarray):
    error, res_num = False, None

    f = get_cache(file_hash)
    if not f:
        error = True
        return error, {}
    if is_paginate:
        return error, f

    x = np.array(f['x'])
    new_x = np.array(new_x)
    args = f['args']
    type_of_number_prev = f['type']

    domain1 = Domain(x)
    fnum1 = domain1.create_number(memberships[type_of_number_prev], *args)

    domain2 = Domain(new_x)
    fnum2 = domain2.create_number(memberships[type_of_number], *unity_number)

    if operation == "+":
        res_num = fnum1 + fnum2
    elif operation == "-":
        res_num = fnum1 - fnum2
    elif operation == "*":
        res_num = fnum1 * fnum2
    else:
        error = True
        return error, {}

    defuz_value = np.round(res_num.defuzz(), 1)
    new_res = {"result": {"result": res_num.values.tolist()},
               "x": res_num.domain.x.tolist(),
               "defuz_value": defuz_value,
               "args": unity_number,
               "type": type_of_number}
    set_cache(file_hash, new_res)
    return error, new_res

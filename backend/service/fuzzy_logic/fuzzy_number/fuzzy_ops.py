from database import set_cache, get_cache
from app import logger

from fuzzyops.fuzzy_numbers import Domain
from fuzzyops.fuzzy_numbers import memberships
from hashlib import sha256

from typing import Union, List
import numpy as np
import torch


def calc_number_with_fuzzy_number(file_hash: str, n: Union[int, float],
                                  operation: str, is_paginate: bool, use_gpu: bool):
    error = False

    try:
        f = get_cache(file_hash)
    except Exception as e:
        return True, {}, "Ошибка подключения к базе Redis", ""

    # f = get_cache(file_hash)
    if not f:
        error = True
        return error, {}, "Нет данных, создайте нечеткого число заново"
    if is_paginate:
        return error, f, "", ""

    x = f['x']
    args = f['args']
    type_of_number = f['type']

    domain = Domain(torch.Tensor(x))
    try:
        if use_gpu:
            domain.to("cuda")
    except Exception as e:
        logger.error(f'{e}')
        return True, {}, "Ошибка использования CUDA, проверьте ее наличие в системе", ""
    
    fnum = domain.create_number(memberships[type_of_number], *args)

    if operation == "+":
        fnum += n
    elif operation == "-":
        fnum -= n
    elif operation == "*":
        fnum *= n
    else:
        error = True
        return error, {}, "Ошибка операции, неверный тип, доступны +, -, *", ""

    defuz_value = np.round(fnum.defuzz(), 1)
    new_res = {"result": {"result": fnum.values.tolist()},
               "x": fnum.domain.x.tolist(),
               "defuz_value": defuz_value,
               "args": args,
               "type": type_of_number}
    
    hash_str = str(new_res) + 'fuzzyopswithnum'
    new_file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    try:
        set_cache(new_file_hash, new_res)
    except Exception as e:
        logger.error(f'{e}')
        return True, {}, "Ошибка подключения к базе Redis", ""
    
    return error, new_res, "", new_file_hash


def calc_fnum_with_fnum(file_hash: str,
                        operation: str, is_paginate: bool,
                        unity_number: List[float], type_of_number: str,
                        new_x, defuzz_type, use_gpu, method):
    error, res_num = False, {}

    try:
        f = get_cache(file_hash)
    except Exception as e:
        return True, {}, "Ошибка подключения к базе Redis", ""

    # f = get_cache(file_hash)
    if not f:
        error = True
        return error, {}, "Нет данных, создайте нечеткого число заново", ""
    if is_paginate:
        return error, f, "", ""

    x = f['x']
    new_x = new_x
    args = f['args']
    type_of_number_prev = f['type']

    domain1 = Domain(torch.Tensor(x))
    try:
        if use_gpu:
            domain1.to("cuda")
    except Exception as e:
        logger.error(f'{e}')
        return True, {}, "Ошибка использования CUDA, проверьте ее наличие в системе", ""
    fnum1 = domain1.create_number(memberships[type_of_number_prev], *args)

    domain2 = Domain(torch.Tensor(new_x))
    try:
        if use_gpu:
            domain2.to("cuda")
    except Exception as e:
        logger.error(f'{e}')
        return True, {}, "Ошибка использования CUDA, проверьте ее наличие в системе", ""
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
    
    hash_str = str(new_res) + 'fuzzyopswithnum'
    new_file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    try:
        set_cache(new_file_hash, new_res)
    except Exception as e:
        logger.error(f'{e}')
        return True, {}, "Ошибка подключения к базе Redis", ""

    return error, new_res, "", new_file_hash

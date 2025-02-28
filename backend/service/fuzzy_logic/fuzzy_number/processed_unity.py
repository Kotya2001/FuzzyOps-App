from database import set_cache, get_cache
from app import logger
from typing import Union, List
import numpy as np

from fuzzyops.fuzzy_numbers import Domain
from fuzzyops.fuzzy_numbers import memberships

import torch



def center_of_grav(x: np.ndarray, values: np.ndarray):
    return np.sum(x * values) / np.sum(values)


def get_fuzzy_number(file_hash: str, array: np.ndarray, name: str,
                     unity_number: List[float], type_of_number: str,
                     defuzz_type: str, use_gpu: bool, method: str) -> Union[tuple[np.ndarray, str], tuple[bool, str]]:
    """
    Функция для вычисления нечеткого числа
    """
    try:
        f = get_cache(file_hash)
    except Exception as e:
        logger.error(f'Error while setting cache in Redis: {e}')
        return False, False, "Ошибка подключения к базе Redis"

    if not f:
        try:
            domain = Domain(torch.Tensor(array.tolist()), name=name, method=method)
            try:
                if use_gpu:
                    domain.to("cuda")
            except Exception as e:
                return False, False, "Ошибка использования CUDA, проверьте ее наличие в системе"
            fnum = domain.create_number(memberships[type_of_number], *unity_number)
            processed_unity = fnum.values.tolist()
            defuz_value = np.round(fnum.defuzz(), 1)
            try:

                set_cache(file_hash, {"result": {"result": processed_unity},
                                    "x": array.tolist(),
                                    "defuz_value": defuz_value,
                                    "args": unity_number,
                                    "type": type_of_number})
            except Exception as e:
                logger.error(f'Error while setting cache in Redis: {e}')
                return False, False, "Ошибка подключения к базе Redis"

        except AssertionError:
            logger.error('AssertionError on getting fuzzy number')
            return False, False, "Ошибка при создании нечеткого числа"
    else:
        processed_unity = f['result']['result']
        defuz_value = np.round(f['defuz_value'], 1)
        processed_unity = np.array(processed_unity)
        processed_unity = np.round(processed_unity, 3)

    return processed_unity, defuz_value, ""

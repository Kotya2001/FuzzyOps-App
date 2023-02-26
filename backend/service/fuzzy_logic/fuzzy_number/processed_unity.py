from backend.database import set_cache, get_cache
from app import logger
from typing import Union, List
import numpy as np

from fuzzyops._domain import Domain
from fuzzyops.fuzzify.mf import memberships


def center_of_grav(x: np.ndarray, values: np.ndarray):
    return np.sum(x * values) / np.sum(values)


def get_fuzzy_number(file_hash: str, array: np.ndarray,
                     unity_number: List[float], type_of_number: str) -> Union[tuple[np.ndarray], tuple[bool]]:
    """
    Функция для вычисления нечеткого числа
    """

    f = get_cache(file_hash)
    if not f:
        try:
            domain = Domain(array)
            fnum = domain.create_number(memberships[type_of_number], *unity_number)
            processed_unity = fnum.values.tolist()
            defuz_value = np.round(fnum.defuzz(), 1)
            set_cache(file_hash, {"result": {"result": processed_unity},
                                  "x": array.tolist(),
                                  "defuz_value": defuz_value,
                                  "args": unity_number,
                                  "type": type_of_number})
        except AssertionError:
            logger.error('AssertionError on getting fuzzy number')
            return False, False
    else:
        processed_unity = f['result']['result']
        defuz_value = np.round(f['defuz_value'], 1)
        processed_unity = np.array(processed_unity)
        processed_unity = np.round(processed_unity, 3)

    return processed_unity, defuz_value

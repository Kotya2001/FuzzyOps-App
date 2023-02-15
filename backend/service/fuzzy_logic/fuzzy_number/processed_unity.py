from backend.database import set_cache, get_cache
from app import logger
from typing import Union, List
import numpy as np
from fuzzyops.fuzzify.mf import memberships


def get_fuzzy_number(file_hash: str, array: np.array,
                     unity_number: List[float], unity: List[str]) -> Union[np.ndarray, bool]:
    """
    Функция для вычисления нечеткого числа
    """

    f = get_cache(file_hash)
    if not f:
        try:
            type_of_number = unity[1]
            processed_unity = memberships[type_of_number](array, *unity_number)
            set_cache(file_hash, {"result": {"result": processed_unity.tolist()}, "x": array.tolist()})
        except AssertionError:
            logger.error('AssertionError on getting fuzzy number')
            return False
    else:
        processed_unity = f['result']['result']
        processed_unity = np.array(processed_unity)
        processed_unity = np.round(processed_unity, 3)

    return processed_unity

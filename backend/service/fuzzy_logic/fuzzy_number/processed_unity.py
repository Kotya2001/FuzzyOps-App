from backend.database import set_cache, get_cache
from app import logger
from typing import Union, List
import numpy as np


# memberships
def trianglemf(x: np.ndarray, a: float, b: float, c: float) -> np.ndarray:
    assert a <= b <= c, "a <= b <= c"
    y = np.zeros(len(x))
    if a != b:
        idx = np.argwhere((a < x) & (x < b))
        y[idx] = (x[idx] - a) / float(b - a)
    if b != c:
        idx = np.argwhere((b < x) & (x < c))
        y[idx] = (c - x[idx]) / float(c - b)
    idx = np.nonzero(x == b)
    y[idx] = 1
    return y


def trapezoidalmf(x: np.ndarray, a: float, b: float,
                  c: float, d: float) -> np.ndarray:
    assert a <= b <= c, "a <= b <= c <= d"
    y = np.zeros(len(x))
    if a != b:
        idx = np.argwhere((a < x) & (x < b))
        y[idx] = (x[idx] - a) / float(b - a)
    idx = np.nonzero(np.logical_and(b < x, x < c))[0]
    y[idx] = 1
    if c != d:
        idx = np.argwhere((c < x) & (x < d))
        y[idx] = (d - x[idx]) / float(d - c)
    return y


def get_fuzzy_number(file_hash: str, array: np.array,
                     unity_number: List[float], unity: List[str]) -> Union[np.ndarray, bool]:
    """
    Функция для вычисления нечеткого числа
    """

    f = get_cache(file_hash)
    if not f:
        try:
            processed_unity = trianglemf(array, *unity_number) \
                if unity[1] == 'triangle' else trapezoidalmf(array, *unity_number)
            set_cache(file_hash, {"result": {"result": processed_unity.tolist()}, "x": array.tolist()})
        except AssertionError:
            logger.error('AssertionError on getting fuzzy number')
            return False
    else:
        processed_unity = f['result']['result']
        processed_unity = np.array(processed_unity)
        processed_unity = np.round(processed_unity, 3)

    return processed_unity


from database import get_cache
from app import logger
from typing import Union
import numpy as np



def get_fuzzy_number_from_db(key: str) -> Union[tuple[np.ndarray, str], tuple[bool, str]]:
	try:
		f = get_cache(key)
	except Exception as e:
		logger.error(f'Error while setting cache in Redis: {e}')
		return False, False, False, "Ошибка подключения к базе Redis"
	
	if not f:
		return False, False, False, "Нет такого ключа в базе данных, Создайте число заново"
	processed_unity = f['result']['result']
	arr = f['x']
	defuz_value = np.round(f['defuz_value'], 1)
	processed_unity = np.array(processed_unity)
	processed_unity = np.round(processed_unity, 3)
	return processed_unity, defuz_value, arr, ""



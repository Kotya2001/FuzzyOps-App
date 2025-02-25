from database import get_cache
from typing import Dict, List, Union


# получаем данные из кэша
def create_file(file_hash: str) -> Union[Dict[str, List[float]], None]:
    res = get_cache(file_hash)
    if res:
        x, unity = res['x'], res['result']['result']
        file = {"x": x, "unity": unity}
        return file
    return None

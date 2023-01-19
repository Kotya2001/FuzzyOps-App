from backend.database import get_cache
from typing import Dict, List


# получаем данные из кэша
def create_file(file_hash: str) -> Dict[str, List[float]]:
    res = get_cache(file_hash)
    x, unity = res['x'], res['result']['result']
    file = {"x": x, "unity": unity}
    return file

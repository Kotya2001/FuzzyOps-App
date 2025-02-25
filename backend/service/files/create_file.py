from database import get_cache
from typing import Dict, List, Union


# получаем данные из кэша
def create_file(file_hash: str) -> Union[Dict[str, List[float]], None]:
    res = get_cache(file_hash)
    if res:
        x, unity, defuzz_value  = res['x'], res['result']['result'], res["defuz_value"]
        file = {"x": x, "values": unity, "defuzz_value": defuzz_value}
        return file
    return None

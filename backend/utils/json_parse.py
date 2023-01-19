from typing import Any
from flask import Request


def parse_json_from_request(request: Request) -> tuple[dict[str, Any], bool]:
    parsed_data = request.get_json(force=True)
    if parsed_data is None:
        return {"err": "Json Parse Error"}, True
    return parsed_data, False

from typing import Any, Union
from flask import jsonify, Response


def create_response(status: int, message: Union[tuple, str, None], data: Union[dict[str, Any], None]) -> Response:
    response: dict[str, Any] = {"status": status}

    if message is not None:
        if type(message) == tuple:
            response["message"] = message[0]
        else:
            response["message"] = message

    if data is not None:
        response["data"] = data

    if message is None and data is None:
        raise Exception(
            'At least one of the two parameters must '
            'be passed to the function: **message** or **data**'
        )

    return jsonify(response)

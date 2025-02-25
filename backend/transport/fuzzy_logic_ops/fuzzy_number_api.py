from app import app
from utils import Message, create_response, parse_json_from_request
from service import get_fuzzy_number

from flask import request
from flask_api import status
from hashlib import sha256

import numpy as np
from typing import List


@app.route('/api/fnum/create', methods=['POST'])
def api_fuzzy_number_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    

    data: dict = full_data.get("fuzzyNumber")
    hash_str = str(data) + 'fuzzification'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    arr: List[float] = data.get('data')
    unity: List[str] = data.get('key')
    name: str = data.get('name')
    ling: str = data.get('ling')

    if not arr or not unity or not name or not ling:
        response = create_response(
            status=status.HTTP_406_NOT_ACCEPTABLE,
            message=Message.no_unity_and_key,
            data=None
        )
        return response

    array: np.ndarray = np.array(arr)
    unity_number: List[float] = [float(u) for u in unity[0].split(" ")]
    type_of_number = unity[1]
    m, mi = np.max(array), np.min(array)

    processed_unity, defuz_value = get_fuzzy_number(file_hash=file_hash,
                                                    array=array,
                                                    name=name,
                                                    unity_number=unity_number,
                                                    type_of_number=type_of_number)
    if isinstance(processed_unity, bool):
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=Message.assertion_error,
            data=None
        )
        return response
    result = np.vstack((array, processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data={"result": res,
              "params": {"max": float(m), "min": float(mi)},
              "file_hash": file_hash,
              "name": name,
              "ling": ling,
              "defuz_value": defuz_value}
    )
    return response

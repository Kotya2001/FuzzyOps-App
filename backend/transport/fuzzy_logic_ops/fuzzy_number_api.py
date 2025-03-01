from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_fuzzy_number, get_fuzzy_number_from_db, \
calc_number_with_fuzzy_number, calc_fnum_with_fnum

from flask import request
from flask_api import status
from hashlib import sha256

import numpy as np
from typing import List, Union


def create_resp(array, processed_unity, defuz_value, file_hash):

    result = np.vstack((array, processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None
    data = {"result": res,
            "file_hash": file_hash,
            "defuz_value": defuz_value}
    return data


@app.route('/api/fnum/get/<key>', methods=['GET'])
def api_fuzzy_number_handler_get(key):

    if (request.method != "GET"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
            data=None
        )
        return response, 404
    
    processed_unity, defuz_value, arr, msg = get_fuzzy_number_from_db(key)

    if msg:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=msg,
            data=None
        )
        return response, 409
    
    result = np.vstack((np.array(arr), processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data={"result": res,
              "defuz_value": defuz_value}
    )
    return response, 200
    





@app.route('/api/fnum/create', methods=['POST'])
def api_fuzzy_number_handler():

    if (request.method != "POST"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод POST",
            data=None
        )
        return response, 404
    
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 400

    data: dict = full_data

    error, msg = validate_data(data, "Создание нечеткого числа")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=None
        )
        return response, 400
    
    hash_str = str(data) + 'fuzzification'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    arr: List[float] = data.get('data')
    unity: List[str] = data.get('key')
    name: str = data.get('name')
    ling: str = data.get('ling')
    defuzz_type: str = data.get('defuzz_type')
    use_gpu: bool = data.get("use_gpu")
    method: str = data.get("method")

    if not arr or not unity or not name or not ling:
        response = create_response(
            status=status.HTTP_406_NOT_ACCEPTABLE,
            message=Message.no_unity_and_key,
            data=None
        )
        return response, 406

    array: np.ndarray = np.array(arr)
    unity_number: List[float] = [float(u) for u in unity[0].split(" ")]
    type_of_number = unity[1]

    processed_unity, defuz_value, msg = get_fuzzy_number(file_hash=file_hash,
                                                    array=array,
                                                    name=name,
                                                    unity_number=unity_number,
                                                    type_of_number=type_of_number,
                                                    defuzz_type=defuzz_type,
                                                    use_gpu=use_gpu,
                                                    method=method)
    if isinstance(processed_unity, bool):
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=msg,
            data=None
        )
        return response, 409
    
    result = np.vstack((array, processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data={"result": res,
              "file_hash": file_hash,
              "defuz_value": defuz_value}
    )
    return response, 200


@app.route('/api/fnum/ops', methods=['POST'])
def api_fuzzy_number_ops_handler():
    """
    Функция для выполнения нечетких опреций
    """
    if (request.method != "POST"):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод POST",
            data=None
        )
        return response, 404
    
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response, 409
        
    file_hash: str = full_data.get("file_hash")
    operation: str = full_data.get("operation")
    value: Union[str, dict] = full_data.get("value")
    is_paginate: bool = False
    use_gpu: bool = full_data.get("use_gpu")

    if not isinstance(value, dict):

        err, msg = validate_data({"value": value,
                                  "file_hash": file_hash,
                                  "operation": operation,
                                  "use_gpu": use_gpu}, "Операции Нечеткое Четкое")
        if err:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=msg + " Проверьте типы данных в файле",
                data=None
            )
            return response, 400

        error, cached_res, msg, new_file_hash = calc_number_with_fuzzy_number(file_hash, float(value),
                                                           operation, is_paginate, use_gpu)
        if error:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=msg,
                data=None
            )
            return response, 400
        array, processed_unity, defuz_value = np.array(cached_res['x']), \
                                              np.array(cached_res['result']['result']), \
                                              cached_res['defuz_value']

        result = create_resp(array, processed_unity, defuz_value, new_file_hash)

        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=result
        )
        return response, 200
    else:
        d = full_data.copy()

        err, msg = validate_data(d, "Операции Нечеткое Нечеткое")
        if err:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=msg + " Проверьте типы данных в файле",
                data=None
            )
            return response, 400

        data: dict = value.get("data")
        new_x = data.get("data")
        defuzz_type = data.get("defuzz_type")
        use_gpu = data.get("use_gpu")
        method = data.get("method")

        unity: List[str] = value.get('key')
        unity_number: List[float] = [float(u) for u in unity[0].split(" ")]
        type_of_number = unity[1]
        error, cached_res, msg, new_file_hash = calc_fnum_with_fnum(file_hash, operation, is_paginate,
                                                unity_number, type_of_number, 
                                                new_x, defuzz_type, use_gpu, method)
        
        if error:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=Message.file_hash_or_operation_err,
                data=None
            )
            return response, 400
        array, processed_unity, defuz_value = np.array(cached_res['x']), \
                                              np.array(cached_res['result']['result']), \
                                              cached_res['defuz_value']

        result = create_resp(array, processed_unity, defuz_value, new_file_hash)
        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=result
        )
        return response, 200

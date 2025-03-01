from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import calc_number_with_fuzzy_number, calc_fnum_with_fnum

import numpy as np
from flask_api import status
from flask import request

import math
from typing import Union, List


def create_resp(array, processed_unity, defuz_value,
                currentPage, points, file_hash):
    all_pages = math.ceil(array.shape[0] / points)
    m, mi = np.max(array), np.min(array)

    array = array[currentPage * points: (currentPage + 1) * points]
    processed_unity = processed_unity[currentPage * points: (currentPage + 1) * points]

    result = np.vstack((array, processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None
    data = {"result": res,
            "params": {"max": float(m), "min": float(mi)},
            "all_pages": all_pages,
            "file_hash": file_hash,
            "defuz_value": defuz_value}
    return data


@app.route('/main/fuzzyLog/fuzzyOps', methods=["POST"])
def fuzzy_ops_handler():
    """
    Функция для выполнения нечетких опреций
    """
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    
    pagination_params: dict = full_data.get("paginationParams")
    currentPage, points = pagination_params.get("currentPage"), pagination_params.get("points")
    file_hash: str = full_data.get("file_hash")
    operation: str = full_data.get("operation")
    value: Union[str, dict] = full_data.get("value")
    is_paginate: bool = full_data.get("isPagination")
    use_gpu: bool = full_data.get("use_gpu")

    print(full_data)

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
            return response

        error, cached_res, msg, new_file_hash = calc_number_with_fuzzy_number(file_hash, float(value),
                                                           operation, is_paginate, use_gpu)
        if error:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=msg,
                data=None
            )
            return response
        array, processed_unity, defuz_value = np.array(cached_res['x']), \
                                              np.array(cached_res['result']['result']), \
                                              cached_res['defuz_value']

        result = create_resp(array, processed_unity, defuz_value,
                             currentPage, points, new_file_hash)

        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=result
        )
        return response
    else:
        d = full_data.copy()
        d.pop('paginationParams', None)
        d.pop('isPagination', None)
        d.pop('useGpu', None)

        err, msg = validate_data(d, "Операции Нечеткое Нечеткое")
        if err:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=msg + " Проверьте типы данных в файле",
                data=None
            )
            return response

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
            return response
        array, processed_unity, defuz_value = np.array(cached_res['x']), \
                                              np.array(cached_res['result']['result']), \
                                              cached_res['defuz_value']

        result = create_resp(array, processed_unity, defuz_value,
                             currentPage, points, new_file_hash)
        response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=result
        )
        return response

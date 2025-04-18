from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_fuzzy_number

from flask import request
from flask_api import status
from hashlib import sha256

import numpy as np
import math
from typing import List


# TODO: добавить ползунок для alpha_cut и выклбчатель для энтропии
# TODO: use torch.Tensor instead np.array in line 45
@app.route('/main/fuzzyLog/GetNumber', methods=['POST'])
def fuzzy_number_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
    
    pagination_params: dict = full_data.get("paginationParams")
    data: dict = full_data.get("fuzzyNumber")

    error, msg = validate_data(data, "Создание нечеткого числа")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=None
        )
        return response
    hash_str = str(data) + 'fuzzification'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    currentPage, points = pagination_params.get("currentPage"), pagination_params.get("points")
    arr: List[float] = data.get('data')
    unity: List[str] = data.get('key')
    name: str = data.get('name')
    ling: str = data.get('ling')
    defuzz_type: str = data.get('defuzz_type')
    use_gpu: bool = data.get("use_gpu")
    method: str = data.get("method")




    if not arr or not unity:
        response = create_response(
            status=status.HTTP_406_NOT_ACCEPTABLE,
            message=Message.no_unity_and_key,
            data=None
        )
        return response

    array: np.ndarray = np.array(arr)
    unity_number: List[float] = [float(u) for u in unity[0].split(" ")]
    type_of_number = unity[1]
    all_pages = math.ceil(array.shape[0] / points)
    m, mi = np.max(array), np.min(array)

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
        return response
    
    array = array[currentPage * points: (currentPage + 1) * points]
    processed_unity = processed_unity[currentPage * points: (currentPage + 1) * points]
    result = np.vstack((array, processed_unity)).transpose()
    res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
    defuz_value = defuz_value if not np.isnan(defuz_value) else None

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data={"result": res,
              "params": {"max": float(m), "min": float(mi)},
              "all_pages": all_pages,
              "file_hash": file_hash,
              "name": name,
              "ling": ling,
              "defuz_value": defuz_value}
    )
    return response

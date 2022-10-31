import datetime
import math

from logger import logger
from flask import Blueprint, request, jsonify
from utils import user_access, define_points
from database import get_file_by_hash, create_obj
from fuzzyLogic.fuzzyNumber import trianglemf, trapezoidalmf

import numpy as np
from ast import literal_eval
from hashlib import sha256

logger = logger('fuzzyLogic')

app_fuzzy_logic = Blueprint('app_fuzzy_logic', __name__)


@app_fuzzy_logic.route('/main/fuzzyLog/GetNumber', methods=['POST'])
@user_access
def fuzzyNumber():
    data = request.files['file'].read()
    pagination_params = request.form.get('data')
    if pagination_params is None:
        return jsonify({"status": "error", "msg": "Ошибка пагинации"})
    pagination_params = literal_eval(pagination_params)
    currentPage, points = pagination_params['currentPage'], pagination_params['points']
    user = literal_eval(literal_eval(request.form.get('user')))
    file_hash = sha256(bytes(data.decode('utf-8'), 'UTF-8')).hexdigest()

    d = literal_eval(data.decode('utf-8'))
    arr = d.get('data', None)
    arr = np.array(arr)
    points = define_points(arr.shape[0])
    all_pages = math.ceil(arr.shape[0] / points)

    f = get_file_by_hash(file_hash)

    if not f:
        if 'triangle' in d:
            unity = d.get('triangle', None)
            processed_unity = trianglemf(arr, *unity) if unity is not None else []
            if len(processed_unity) != 0:
                create_obj({"user_id": user['uid'],
                            "operation_type": "fazzification",
                            "dt_created": datetime.datetime.now(),
                            "file_hash": file_hash, "result": {"result": processed_unity.tolist()}}, 'cache')
            else:
                return jsonify({"status": "error", "msg": "Невозножно найти множество"})
        elif 'trap' in d:
            unity = d.get('trap', None)
            processed_unity = trapezoidalmf(arr, *unity) if unity is not None else []
            if len(processed_unity) != 0:
                create_obj({"user_id": user['uid'],
                            "operation_type": "fazzification",
                            "dt_created": datetime.datetime.now(),
                            "file_hash": file_hash, "result": {"result": processed_unity.tolist()}}, 'cache')
            else:
                return jsonify({"status": "error", "msg": "Невозножно найти множество"})
        else:
            return jsonify({'status': 'error', 'msg': 'Отсутствует множество в файле'})
    else:
        processed_unity = f.result['result']

    processed_unity = np.array(processed_unity)
    arr = arr[currentPage * points: (currentPage + 1) * points]

    if len(processed_unity) != 0:
        processed_unity = np.round(processed_unity, 3)
        processed_unity = processed_unity[currentPage * points: (currentPage + 1) * points]
        result = np.vstack((arr, processed_unity)).transpose()
        m, mi = np.max(arr), np.min(arr)
        return jsonify({"status": "ok", "result": result.tolist(),
                        "params": {"max": float(m), "min": float(mi)},
                        "all_pages": all_pages})
    return jsonify({"status": "error", "msg": "Отсутствуют данные в в файле"})

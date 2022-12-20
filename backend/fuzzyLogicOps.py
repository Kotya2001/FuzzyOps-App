import math

from logger import logger
from flask import Blueprint, request, jsonify
from utils import define_points
from fuzzyLogic.fuzzyNumber import trianglemf, trapezoidalmf, FuzzyNumber, \
    fuzzy_unite, fuzzy_intersect, fuzzy_difference
from redis_db import get_cache, set_cache

import numpy as np
from hashlib import sha256

logger = logger('fuzzyLogic')

app_fuzzy_logic = Blueprint('app_fuzzy_logic', __name__)


@app_fuzzy_logic.route('/main/fuzzyLog/GetNumber', methods=['POST'])
def fuzzyNumber():
    full_data = request.get_json(force=True)
    pagination_params, data = full_data['paginationParams'], full_data['fuzzyNumber']

    if pagination_params is None:
        return jsonify({"status": "error", "msg": "Ошибка пагинации"})
    try:
        currentPage, points = pagination_params['currentPage'], pagination_params['points']
        hash_str = str(data) + 'fazzification'
        file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
        d = data

        arr = d.get('data')
        if arr is None:
            return jsonify({"status": "error", "msg": "Отсутствие универсальных множеств"})
        arr = np.array(arr)

        unity = d.get('key')

        if unity is None:
            return jsonify({"status": "error", "msg": "Отсутствие способа задания нечеткого числа"})
        unity_number = [int(u) for u in unity[0].split(" ")]
        all_pages = math.ceil(arr.shape[0] / points)

        f = get_cache(file_hash)

        if not f:
            try:
                processed_unity = trianglemf(arr, *unity_number)\
                    if unity[1] == 'triangle' else trapezoidalmf(arr, *unity_number)
                set_cache(file_hash, {"result": {"result": processed_unity.tolist()}})
            except Exception as e:
                logger.error(f'[ERROR]: {e}')
                return jsonify({'status': 'error', 'msg': str(e)})
        else:
            processed_unity = f['result']['result']
        # TODO: добавить ползунок для alpha_cut и выклбчатель для энтропии
        processed_unity = np.array(processed_unity)
        m, mi = np.max(arr), np.min(arr)
        arr = arr[currentPage * points: (currentPage + 1) * points]

        if len(processed_unity) != 0:
            processed_unity = np.round(processed_unity, 3)
            processed_unity = processed_unity[currentPage * points: (currentPage + 1) * points]
            result = np.vstack((arr, processed_unity)).transpose()
            res = [{"x": elem[0], "y": elem[1]} for elem in result.tolist()]
            return jsonify({"status": "ok", "result": res,
                            "params": {"max": float(m), "min": float(mi)},
                            "all_pages": all_pages})
        return jsonify({"status": "error", "msg": "Отсутствуют данные в в файле"})
    except Exception as e:
        logger.error(f'[ERROR]: {e}')
        return jsonify({'status': 'error', 'msg': str(e)})


# @app_fuzzy_logic.route('/main/fuzzyLog/Defuzzyfy', methods=['POST'])
# # @user_access
# def defuzzyfyNumber():
#     data = request.files['file'].read()
#
#     try:
#         d = literal_eval(data.decode('utf-8'))
#
#         arr = d.get('data', None)
#         if arr is None:
#             return jsonify({"status": "error", "msg": "Отсутствие универсальных множеств"})
#         arr = np.array(arr)
#
#         unity = d.get('trap') if 'trap' in d else d.get('triangle')
#         if unity is None:
#             return jsonify({"status": "error", "msg": "Отсутствие способа задания нечеткого числа"})
#
#         by = d.get('by')
#         if by is None:
#             return jsonify({"status": "error", "msg": "Не задан метод дефаззицикации"})
#
#         try:
#             processed_unity = trianglemf(arr, *unity) if 'triangle' in d else trapezoidalmf(arr, *unity)
#             number = FuzzyNumber(arr, processed_unity)
#             number = number.defuzz(by=by)
#         except Exception as e:
#             logger.error(f'[ERROR]: {e}')
#             return jsonify({'status': 'error', 'msg': str(e)})
#
#         return jsonify({"status": "ok", "result": number})
#     except Exception as e:
#         logger.error(f'[ERROR]: {e}')
#         return jsonify({'status': 'error', 'msg': str(e)})
#
#
# @app_fuzzy_logic.route('/main/fuzzyLog/NumOps', methods=['POST'])
# # @user_access
# def opsnumber():
#     data = request.files['file'].read()
#     pagination_params = request.form.get('data')
#     if pagination_params is None:
#         return jsonify({"status": "error", "msg": "Ошибка пагинации"})
#     try:
#         pagination_params = literal_eval(pagination_params)
#         currentPage, points = pagination_params['currentPage'], pagination_params['points']
#         # user = literal_eval(literal_eval(request.form.get('user')))
#         hash_str = data.decode('utf-8') + 'opsnumber'
#         file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
#
#         d = literal_eval(data.decode('utf-8'))
#
#         first, second = d.get('first'), d.get('second')
#         if first is None or second is None:
#             return jsonify({"status": "error", "msg": "Отсутствие данных"})
#
#         x1, x2 = first.get('x'), second.get('x')
#
#         if x1 is None or x2 is None:
#             return jsonify({"status": "error", "msg": "Отсутствие универсальных множеств"})
#         x1 = np.array(x1)
#         x2 = np.array(x2) if not isinstance(x2, (int, float)) else x2
#
#         u1 = first.get('trap') if 'trap' in first else first.get('triangle')
#         u2 = second.get('trap') if 'trap' in second else second.get('triangle')
#
#         if u1 is None or (u2 is None and not isinstance(x2, (int, float))):
#             return jsonify({"status": "error", "msg": "Отсутствие способа задания нечеткого числа"})
#
#         ops = d.get('ops')
#         if ops is None:
#             return jsonify({"status": "error", "msg": "Не задана операция"})
#
#         method = d.get('method')
#         if method is None and not isinstance(x2, (int, float)):
#             return jsonify({"status": "error", "msg": "Не задан метод (Добавьте prob или minimax)"})
#
#         f = get_cache(file_hash)
#         if not f:
#             processed_unity1 = trianglemf(x1, *u1) if 'triangle' in first else trapezoidalmf(x1, *u1)
#
#             if not isinstance(x2, (int, float)):
#                 processed_unity2 = trianglemf(x2, *u2) if 'triangle' in second else trapezoidalmf(x2, *u2)
#
#                 f1, f2 = FuzzyNumber(x1, processed_unity1, method=method), FuzzyNumber(x2, processed_unity2)
#
#                 if ops == '+':
#                     f3 = fuzzy_unite(f1, f2)
#                 elif ops == '*':
#                     f3 = fuzzy_intersect(f1, f2)
#                 elif ops == '-':
#                     f3 = fuzzy_difference(f1, f2)
#                 else:
#                     return jsonify({"status": "error", "msg": "Неизвестная операция"})
#
#                 res = {"result": {"x": np.round(f3.get_x(), 3).tolist(), "y": np.round(f3.get_values(), 3).tolist()}}
#                 set_cache(file_hash, res)
#             else:
#                 f1 = FuzzyNumber(x1, processed_unity1)
#
#                 if ops == '+':
#                     f3 = f1 + x2
#                 elif ops == '*':
#                     f3 = f1 * x2
#                 elif ops == '-':
#                     f3 = f1 - x2
#                 else:
#                     return jsonify({"status": "error", "msg": "Неизвестная операция"})
#
#                 res = {"result": {"x": np.round(f3.get_x(), 3).tolist(), "y": np.round(f3.get_values(), 3).tolist()}}
#                 set_cache(file_hash, res)
#         else:
#             res = f['result']
#         arr = np.array(res['x'])
#         points = define_points(arr.shape[0])
#         all_pages = math.ceil(arr.shape[0] / points)
#         y = np.array(res['y'])
#         # TODO: добавить ползунок для alpha_cut и выклбчатель для энтропии
#
#         arr = arr[currentPage * points: (currentPage + 1) * points]
#         y = y[currentPage * points: (currentPage + 1) * points]
#
#         result = np.vstack((arr, y)).transpose()
#         m, mi = np.max(arr), np.min(arr)
#         return jsonify({"status": "ok", "result": result.tolist(),
#                         "params": {"max": float(m), "min": float(mi)},
#                         "all_pages": all_pages})
#     except Exception as e:
#         logger.error(f'[ERROR]: {e}')
#         return jsonify({'status': 'error', 'msg': str(e)})

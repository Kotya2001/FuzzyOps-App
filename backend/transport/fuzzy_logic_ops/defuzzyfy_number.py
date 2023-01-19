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
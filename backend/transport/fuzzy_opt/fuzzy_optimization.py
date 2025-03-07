from app import app
from utils import create_response, validate_data, parse_json, parse_csv
from service import get_metaev_result
from flask import request
from flask_api import status
from hashlib import sha256
    


@app.route('/main/fuzzyMetaevOpt/calc', methods=['POST'])
def fuzzy_metaev_opt():
    """
    Функция для создания нечеткого графа
    """
    (df, err) = parse_csv(request, "csvFile")
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=err,
            data={}
        )
        return response
    (params, err) = parse_json(request, "jsonData")
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=err,
            data={}
        )
        return response
    error, msg = validate_data(params, "metaev")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response

    hash_str = str(df) + str(params) + 'metaev_alg'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    res, err, = get_metaev_result(df, params, file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data={}
        )
        return response
    else:
        response = create_response(
            status=status.HTTP_200_OK,
            message="",
            data=res
        )
        return response
    

    
@app.route('/api/metaev_opt/create', methods=['GET', 'POST'])
def fuzzy_metaev_opt_api():
    if (request.method not in ("GET", "POST")):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступны только методы GET, POST",
            data=None
        )
        return response, 404
    
    (df, err) = parse_csv(request, "csvFile")
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=err,
            data={}
        )
        return response, 400
    (params, err) = parse_json(request, "jsonData")
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=err,
            data={}
        )
        return response, 400
    error, msg = validate_data(params, "metaev")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    hash_str = str(df) + str(params) + 'metaev_alg'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()
    res, err, = get_metaev_result(df, params, file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data={}
        )
        return response
    else:
        response = create_response(
            status=status.HTTP_200_OK,
            message="",
            data=res
        )
        return response

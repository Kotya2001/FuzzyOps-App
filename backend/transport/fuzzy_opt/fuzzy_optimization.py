from app import app
from utils import create_response, validate_data
from service import get_metaev_result
from flask import request
from flask_api import status
from hashlib import sha256
import pandas as pd
from io import StringIO
import json

def parse_csv(request, csv_key):
    csv_file = request.files.get(csv_key)
    if csv_file:
        csv_content = csv_file.read().decode('utf-8')
        try:
            df = pd.read_csv(StringIO(csv_content))
        except Exception as e:
            return {}, "Ошибка парсинга .csv файла" 
        return df, ""
    return {}, "Ошибка, нет .csv файла"

def parse_json(request, json_key):
    json_file = request.files.get(json_key)
    if json_file:
         
        json_content = json_file.read().decode('utf-8')
        try:
             full_data = json.loads(json_content)
        except json.JSONDecodeError as e:
            return {}, "Ошибка парсинга .json файла"
        return full_data, ""
    return {}, "Ошибка, нет .json файла"
    


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
    print(res)
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
    

    
    
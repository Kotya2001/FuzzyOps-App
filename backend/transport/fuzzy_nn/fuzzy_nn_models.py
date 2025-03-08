from app import app
from utils import create_response, validate_data, parse_json, \
parse_csv, parse_json_from_request, Message
from service import get_metaev_result, get_linear_opt_res
from flask import request
from flask_api import status
from hashlib import sha256




@app.route('/main/fuzzyNN/train', methods=['POST'])
def fuzzy_nn_train():
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
    print(df)
    print(params)
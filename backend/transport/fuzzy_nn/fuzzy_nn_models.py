from app import app
from utils import create_response, validate_data, parse_json, \
parse_csv, parse_json_from_request, Message
from service import train_model, inference_model, fuzzy_nn2_inference
from flask import request
from flask_api import status
from hashlib import sha256


@app.route('/api/fuzzy_nn/train', methods=['POST'])
def fuzzy_nn_train_api():
    if (request.method not in ("POST")):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод POST",
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
    error, msg = validate_data(params, "fuzzy_nn")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    hash_str = str(df) + str(params) + 'fuzzy_nn'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    err = train_model(df, params, file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=""
        )
        return response, 409
    else:
        response = create_response(
            status=status.HTTP_200_OK,
            message="",
            data=file_hash
        )
        return response, 200

@app.route('/api/fuzzy_nn/get', methods=['GET'])
def fuzzy_nn_inference_api():
    if (request.method not in ("GET")):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступен только метод GET",
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
        
    error, msg = validate_data(full_data, "fuzzy_nn_get")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    ans, err = inference_model(full_data)
    if err:
        response = create_response(
                status=status.HTTP_409_CONFLICT,
                message=err,
                data={})
        return response, 409
    response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=ans)
    return response, 200


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
    
    error, msg = validate_data(params, "fuzzy_nn")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response

    hash_str = str(df) + str(params) + 'fuzzy_nn'
    file_hash = sha256(bytes(hash_str, 'UTF-8')).hexdigest()

    err = train_model(df, params, file_hash)
    if err:
        response = create_response(
            status=status.HTTP_409_CONFLICT,
            message=err,
            data=""
        )
        return response
    else:
        response = create_response(
            status=status.HTTP_200_OK,
            message="",
            data=file_hash
        )
        return response

@app.route('/main/fuzzyNN/get', methods=['POST'])
def fuzzy_nn_inference():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
        
    error, msg = validate_data(full_data, "fuzzy_nn_get")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    ans, err = inference_model(full_data)
    if err:
        response = create_response(
                status=status.HTTP_409_CONFLICT,
                message=err,
                data={})
        return response
    response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=ans)
    return response


@app.route('/main/fuzzyNN2/calc', methods=['POST'])
def fuzzy_nn_inference2():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
            
    error, msg = validate_data(full_data, "fuzzy_nn_2")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    ans, err = fuzzy_nn2_inference(full_data)
    if err:
        response = create_response(
                status=status.HTTP_409_CONFLICT,
                message=err,
                data={})
        return response
    response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=ans)
    return response

@app.route('/api/fuzzy_nn2/get', methods=['POST', 'GET'])
def fuzzy_nn_inference2_api():

    if (request.method not in ("GET", "POST")):
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message="Доступны только методы GET, POST",
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
            
    error, msg = validate_data(full_data, "fuzzy_nn_2")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    ans, err = fuzzy_nn2_inference(full_data)
    if err:
        response = create_response(
                status=status.HTTP_409_CONFLICT,
                message=err,
                data={})
        return response, 400
    response = create_response(
            status=status.HTTP_200_OK,
            message='ok',
            data=ans)
    return response, 400



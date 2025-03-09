from app import app
from utils import create_response, validate_data, parse_json_from_request, Message
from service import get_prediction
from flask import request
from flask_api import status


@app.route('/main/fuzzyPred/calc', methods=['POST'])
def fuzzy_pred():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response
            
    error, msg = validate_data(full_data, "fuzzy_pred")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response
    ans, err = get_prediction(full_data)
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

@app.route('/api/fpred/get', methods=['POST', 'GET'])
def fuzzy_pred_api():

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
            
    error, msg = validate_data(full_data, "fuzzy_pred")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=msg + " Проверьте типы данных в файле",
            data=""
        )
        return response, 400
    ans, err = get_prediction(full_data)
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
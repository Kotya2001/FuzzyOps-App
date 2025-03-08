from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_fuzzy_inference

from flask import request
from flask_api import status



@app.route('/api/flogic/get', methods=['POST', 'GET'])
def flogic_api_handler():
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
    rule_type = full_data.get("type")
    if not rule_type:
            response = create_response(
                   status=status.HTTP_400_BAD_REQUEST,
                   message="Не задан тип построения базы правил",
                   data=None
        ), 400
    if rule_type == "mamdani":
            error, msg = validate_data(full_data, "mamdani")
            if error:
                response = create_response(
                        status=status.HTTP_400_BAD_REQUEST,
                        message=msg + " Проверьте типы данных в файле",
                        data=None
                    )
                return response, 400
            ans, err = get_fuzzy_inference(full_data)
            if err:
                 response = create_response(
                        status=status.HTTP_409_CONFLICT,
                        message=err,
                        data=None
                    )
                 return response, 409
            response = create_response(
                 status=status.HTTP_200_OK,
                 message='ok',
                data=ans)
            return response, 200
    elif rule_type == "singleton":
            error, msg = validate_data(full_data, "singleton")
            if error:
                response = create_response(
                    status=status.HTTP_400_BAD_REQUEST,
                    message=msg + " Проверьте типы данных в файле",
                    data=None
                    )
                return response, 400
            ans, err = get_fuzzy_inference(full_data)
            if err:
                 response = create_response(
                        status=status.HTTP_409_CONFLICT,
                        message=err,
                        data=None
                    )
                 return response, 409
            response = create_response(
                 status=status.HTTP_200_OK,
                 message='ok',
                data=ans)
            return response, 200
    else:
             response = create_response(
                      status=status.HTTP_400_BAD_REQUEST,
                    message="Неизвестный тип задачи",
                                   data=None
                                                           )
             return response, 400


@app.route('/main/fuzzyLogic/Rules', methods=['POST'])
def fuzzy_logic_rules_handler():
        (full_data, error) = parse_json_from_request(request)
        if error:
                response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
                return response
        rule_type = full_data.get("type")
        if not rule_type:
            response = create_response(
                   status=status.HTTP_400_BAD_REQUEST,
                   message="Не задан тип построения базы правил",
                   data=None
        )
        if rule_type == "mamdani":
            error, msg = validate_data(full_data, "mamdani")
            if error:
                response = create_response(
                        status=status.HTTP_400_BAD_REQUEST,
                        message=msg + " Проверьте типы данных в файле",
                        data=None
                    )
                return response
            ans, err = get_fuzzy_inference(full_data)
            if err:
                 response = create_response(
                        status=status.HTTP_409_CONFLICT,
                        message=err,
                        data=None
                    )
                 return response
            response = create_response(
                 status=status.HTTP_200_OK,
                 message='ok',
                data=ans)
            return response
            
            
        elif rule_type == "singleton":
            error, msg = validate_data(full_data, "singleton")
            if error:
                response = create_response(
                    status=status.HTTP_400_BAD_REQUEST,
                    message=msg + " Проверьте типы данных в файле",
                    data=None
                    )
                return response
            ans, err = get_fuzzy_inference(full_data)
            if err:
                 response = create_response(
                        status=status.HTTP_409_CONFLICT,
                        message=err,
                        data=None
                    )
                 return response
            response = create_response(
                 status=status.HTTP_200_OK,
                 message='ok',
                data=ans)
            return response
        else:
             response = create_response(
                      status=status.HTTP_400_BAD_REQUEST,
                    message="Неизвестный тип задачи",
                                   data=None
                                                           )
             return response
        



        
        
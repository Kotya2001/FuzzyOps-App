from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import solve_msa_task
from flask import request
from flask_api import status


@app.route('/main/fuzzyMsa/calc', methods=['POST'])
def fuzzy_msa_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response

    task_type = full_data.get("taskType")
    data = full_data.get("msa_data")
    error, _ = validate_data(data, task_type)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.msa_incorrect_data,
            data=None
        )
        return response

    result, error = solve_msa_task(task_type, data)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=error,
            data=None
        )
        return response

    response = create_response(
        status=status.HTTP_200_OK,
        message='ok',
        data=result
    )
    return response

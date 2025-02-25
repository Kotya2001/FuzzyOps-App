from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import clusters
from flask import request, send_file
from flask_api import status


@app.route('/main/fuzzyCluster/calc', methods=['POST'])
def fuzzy_cluster_handler():
    (full_data, error) = parse_json_from_request(request)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.bad_json,
            data=None
        )
        return response

    params = full_data["params"]
    train_data = full_data["train_data"]
    test_data = full_data["test_data"]
    error = validate_data(params, "")
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=Message.msa_incorrect_data,
            data=None
        )
        return response

    result, error = clusters(params, train_data, test_data)
    if error:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=error,
            data=None
        )
        return response

    return send_file(result, mimetype='text/csv', as_attachment=True, download_name='result.csv')


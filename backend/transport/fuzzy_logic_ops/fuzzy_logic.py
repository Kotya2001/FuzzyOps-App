from app import app
from utils import Message, create_response, parse_json_from_request, validate_data
from service import get_fuzzy_number

from flask import request
from flask_api import status
from hashlib import sha256

import numpy as np
import math
from typing import List


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
               response = create_response(
                      status=status.HTTP_400_BAD_REQUEST,
                    message=msg + " Проверьте типы данных в файле",
                                   data=None
                                                           )
               return response
        elif rule_type == "singleton":
               error, msg = validate_data(full_data, "singleton")
               response = create_response(
                      status=status.HTTP_400_BAD_REQUEST,
                    message=msg + " Проверьте типы данных в файле",
                                   data=None
                                                           )
               return response
        else:
             response = create_response(
                      status=status.HTTP_400_BAD_REQUEST,
                    message="Неизвестный тип задачи",
                                   data=None
                                                           )
             return response  
        
		


        
        
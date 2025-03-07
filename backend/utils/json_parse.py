from typing import Any
from flask import Request
import pandas as pd
from io import StringIO
import json


def parse_json_from_request(request: Request) -> tuple[dict[str, Any], bool]:
    parsed_data = request.get_json(force=True)
    if parsed_data is None:
        return {"err": "Json Parse Error"}, True
    return parsed_data, False

def parse_csv(request, csv_key):
    csv_file = request.files.get(csv_key)
    if csv_file:
        csv_content = csv_file.read().decode('utf-8')
        try:
            df = pd.read_csv(StringIO(csv_content), skip_blank_lines=True)
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

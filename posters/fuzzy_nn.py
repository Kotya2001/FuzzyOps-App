import requests
import io

import json


with open("sets.json", encoding="utf-8") as file:
	addr = json.loads(file.read())["addr"]

# ----------------------
# Нечетка нейронная сеть, алгоритм ANFIS

addr = 'http://localhost:5000'

routes = ["/api/fuzzy_nn/train", "/api/fuzzy_nn/get"]

# Набор данных для обучения
path_to_csv = "data/Iris.csv"

# Данные параметров алгоритма
params = {
  "features": [
    "SepalLengthCm",
    "SepalWidthCm"
  ],
  "target": [
    "Species"
  ],
  "task_type": "classification",
  "n_terms": [
    5,
    5
  ],
  "lr": 3e-4,
  "batch_size": 8,
  "member_func_type": "gauss",
  "epochs": 100,
  "use_gpu": False
}

with open(path_to_csv, 'r', encoding='utf-8') as file:
	csv_content = file.read()

csv_buffer = io.StringIO(csv_content)
json_data = json.dumps(params)
json_buffer = io.StringIO(json_data)
csv_buffer.seek(0) 


files = {
    'csvFile': ('data.csv', csv_buffer, 'text/csv'),
	'jsonData': ('data.json', json_buffer,'application/json')
}

train_response = requests.post(f"{addr}{routes[0]}", files=files)

print(train_response.json())
"""
{'data': '9033e099c4cd717a0613e742c32b47e817694b0b68e7fe608c9884b8e9e32d46', 'message': '', 'status': 200}
"""

input_data = {"file_hash": train_response.json()["data"], "input": [[5.1, 3.5]]}

predict_response = requests.get(f"{addr}{routes[1]}", json=input_data)
print(predict_response.json())
"""
{'data': {'class': 'Iris-setosa'}, 'message': 'ok', 'status': 200}
"""


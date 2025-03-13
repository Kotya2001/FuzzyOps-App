import requests
import json
import io

addr = 'http://localhost:5000'

routes = ["/api/metaev_opt/create"]

"""
curl -X POST \
  http://localhost:5000/api/metaev_opt/create \
  -F 'csvFile=@/Users/ilabelozerov/posters/Housing2.csv' \
  -F 'jsonData=@/Users/ilabelozerov/Downloads/ant_params.json'
"""

# ----------------------
# Оптимизация параметров функции принадлежности с помощью непрерывного алгоритма муравьиных колоний

# Данные для поиска параметров
path_to_csv = "data/Housing2.csv"

# Параметры алгоритма муравьиных колоний
params = {
	"k": 5,
	"q": 0.08,
	"epsilon": 0.005,
	"n_iter": 100,
	"ranges": [
		{
			"name": "area",
			"start": 0.01,
			"step": 0.01,
			"end": 1
		}
	],
	"n_ant": 55,
	"target": "price"
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

create_metaev_response = requests.post(f"{addr}{routes[0]}", files=files)

print(create_metaev_response.json())
"""
{'data': {'area': {'1': [0.4808, 0.7467, 0.8239], '10': [0.1392, 0.1396, 0.8239], '11': [0.2753, 0.2975, 0.9655], '2': [0.1278, 0.4934, 0.7772], '3': [0.1086, 0.1771, 0.4184], '4': [0.2135, 0.8516, 0.8696], '5': [0.0487, 0.1852, 0.5717], '6': [0.1083, 0.8607, 0.8849], '7': [0.1945, 0.6325, 0.9299], '8': [0.4478, 0.4585, 0.8585], '9': [0.1239, 0.3417, 0.5872]}}, 'message': '', 'status': 200}
"""


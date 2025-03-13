import requests

addr = 'http://localhost:5000'

routes = ["/api/fgraph/create", "/api/fgraph/shortest_path", "/api/fgraph/clusters",
		   "/api/fgraph/is_dominating", "/api/fgraph/any_dominating", 
		   "/api/fgraph/dominating", "/api/fgraph/assignment"]

# ----------------------
# Нечеткие графы
# Данные для создания нечеткого графа
graph_data = {'graphSettings': {'edgeType': 'undirected',
								'edgeNumberMathType': 'max',
								'edgeNumberEqType': 'base'},
			  'graph_data': [{'start': 0, 'end': 2, 'values': [3, 1, 1]},
					 {'start': 0, 'end': 1, 'values': [2, 1, 1]},
					{'start': 1, 'end': 3, 'values': [5, 1, 1]},
					{'start': 1, 'end': 4, 'values': [1, 1, 1]},
					{'start': 2, 'end': 5, 'values': [6, 1, 1]},
					{'start': 2, 'end': 3, 'values': [4, 1, 1]},
					{'start': 3, 'end': 6, 'values': [3, 1, 1]},
					{'start': 4, 'end': 7, 'values': [4, 1, 1]}]}

create_fgraph_response = requests.post(f"{addr}{routes[0]}", json=graph_data)
print(create_fgraph_response.json())
"""
Пример ответа
{'data': '482f33b71662a7927cf88828770d4270df9daa7beef5900fb2f88e7dad3a7a06',
 'message': 'ok', 
 'status': 200}
"""

# ----------------------
# Рассчет кратчайшего пути

key = create_fgraph_response.json()["data"]

# Данные для расчета кратчайшего пути
path = {"path": "1 2"}

shortest_path = requests.get(f"{addr}{routes[1]}/{key}", json=path)
print(shortest_path.json())
"""
Пример ответа 
{'data': {'path': [1, 0, 2], 'values': [5, 1, 1]}, 'message': 'ok', 'status': 200}
"""

# ----------------------
# Разбиение графа на кластеры (факторизация)
key = create_fgraph_response.json()["data"]
# Данные для разбиения графа на кластеры
cluster = {"cluster": 2}
clusters = requests.get(f"{addr}{routes[2]}/{key}", json=cluster)
print(clusters.json())
"""
Пример ответа
{'data': {'clusters': {'0': [1, 2, 3, 7], '1': [0, 4, 5, 6]}}, 'message': 'ok', 'status': 200}
"""

# ----------------------
# Проверка множества вершин на доминантность
key = create_fgraph_response.json()["data"]
# Данные для проверки на доминантность
dominating = {"dominating": [3, 4, 5]}
dominating_result = requests.get(f"{addr}{routes[3]}/{key}", json=dominating)
print(dominating_result.json())
"""
Пример ответа
{'data': {'is_dominating': False}, 'message': 'ok', 'status': 200}
"""

# ----------------------
# Поиск любого доминирующего множества
key = create_fgraph_response.json()["data"]
result = requests.get(f"{addr}{routes[4]}/{key}", json={})
print(result.json())
"""
Пример ответа
{'data': {'dominating_set': [0, 3, 4, 5]}, 'message': 'ok', 'status': 200}
"""

# ----------------------
# Поиск доминирующего множества
key = create_fgraph_response.json()["data"]
# Данные для поиска доминирующего множества
values = {"values": [4, 1, 1]}
result = requests.get(f"{addr}{routes[5]}/{key}", json=values)
print(result.json())
"""
Пример ответа
{'data': {'dominating_set': [0, 1, 2, 4, 6, 7]}, 'message': 'ok', 'status': 200}
"""

# ----------------------
# Решение задачи о назначении на нечетком графе
key = create_fgraph_response.json()["data"]
# Данные для решения задачи о назначении
assignment = {
	"tasks": [
		"A",
		"B",
		"C"
	],
	"workers": [
		"X",
		"Y",
		"Z"
	],
	"fuzzyCosts": [
		{
			"task": "A",
			"worker": "X",
			"fuzzyCost": [
				6,
				1,
				2
			]
		},
		{
			"task": "A",
			"worker": "Y",
			"fuzzyCost": [
				3,
				1,
				1
			]
		},
		{
			"task": "B",
			"worker": "Z",
			"fuzzyCost": [
				3,
				1,
				2
			]
		},
		{
			"task": "C",
			"worker": "X",
			"fuzzyCost": [
				2,
				1,
				1
			]
		},
		{
			"task": "C",
			"worker": "Y",
			"fuzzyCost": [
				3,
				2,
				1
			]
		},
		{
			"task": "C",
			"worker": "Z",
			"fuzzyCost": [
				1,
				1,
				1
			]
		}
	]
}
result = requests.get(f"{addr}{routes[6]}/{key}", json=assignment)
print(result.json())
"""
Пример ответа
{'data': {'assignments': [{'task': 'C', 'worker': 'X'}, {'task': 'A', 'worker': 'Y'}, {'task': 'B', 'worker': 'Z'}],
 'cost': [8, 1, 2]}, 'message': 'ok', 'status': 200}
"""
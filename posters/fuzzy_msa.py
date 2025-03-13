import requests
import json


# ----------------------
# Нечеткие методы многокритериального анализа

addr = 'http://localhost:5000'

routes = ["/api/fuzzy_msa/get"]

# Данные для построения нечеткой границы Парето
with open("data/pareto.json", encoding="utf-8") as f:
	pareto = json.loads(f.read())

# Данные для построения нечеткой взвешенной суммы
with open("data/fsum.json", encoding="utf-8") as f:
	fsum = json.loads(f.read())

# Данные для построения нечетких попарных стравнений
with open("data/pairs.json", encoding="utf-8") as f:
	pairs = json.loads(f.read())

# Данные для построения нечеткой аналитической иерархии
with open("data/hier.json", encoding="utf-8") as f:
	hier = json.loads(f.read())

# Нечеткая граница Парето
pareto_response = requests.post(f"{addr}{routes[0]}", json=pareto)

print(pareto_response.json())
"""
{'data': {'result': [[5.6666669845581055, 7.3333330154418945], [7.333333492279053, 6.0]]}, 'message': 'ok', 'status': 200}
"""

# Нечеткая взвешенная сумма
fsum_response = requests.post(f"{addr}{routes[0]}", json=fsum)

print(fsum_response.json())
"""
{'data': {'result': [5.6666669845581055, 5.0, 5.999999046325684, 5.0]}, 'message': 'ok', 'status': 200}
"""

# Нечеткие попарные сравения
pairs_response = requests.post(f"{addr}{routes[0]}", json=pairs)

print(pairs_response.json())
"""
{'data': {'result': [['Produc1', 1.0], ['Product2', 2.3333], ['Product3', 1.111]]}, 'message': 'ok', 'status': 200}
"""

# Нечеткая аналитическая иерархия
hier_response = requests.post(f"{addr}{routes[0]}", json=hier)

print(hier_response.json())
"""
{'data': {'result': [28.811939239501953, 22.971296310424805]}, 'message': 'ok', 'status': 200}
"""
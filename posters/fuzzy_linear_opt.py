import requests
import json


with open("sets.json", encoding="utf-8") as file:
	addr = json.loads(file.read())["addr"]

routes = ["/api/fuzzy_linear_opt/get"]

# ----------------------
# Нечеткая линейная оптимизация

# Данные для решения задачи оптимизации с нечеткими коэффициентами
with open('data/fuzzy_linear.json', 'r', encoding='utf-8') as file:
	fuzzy_linear = json.loads(file.read())

# Данные для решения задачи оптимизации с четкими коэффициентами
with open('data/linear.json', 'r', encoding='utf-8') as file:
	linear = json.loads(file.read())

fuzzy_linear_response = requests.post(f"{addr}{routes[0]}", json=fuzzy_linear)
print(fuzzy_linear_response.json())
"""
{'data': {'value': 799.5999984927046, 'vars': [5.999999988702525, 1.9999999962069819]}, 'message': 'ok', 'status': 200}
"""

linear_response = requests.post(f"{addr}{routes[0]}", json=linear)
print(linear_response.json())
"""
{'data': {'value': 27.999999998546777, 'vars': [5.99999999974587, 1.9999999997816476]}, 'message': 'ok', 'status': 200}
"""
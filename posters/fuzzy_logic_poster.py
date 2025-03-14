import requests
import json


with open("sets.json", encoding="utf-8") as file:
	addr = json.loads(file.read())["addr"]

routes = ["/api/flogic/get"]

# ----------------------
# Нечеткая логика, нечеткий логический вывод по алгоритмам Мамдани, Синглтон

# Данные для построения базы правил по Мамдани
with open('data/mamdani.json', 'r', encoding='utf-8') as file:
	mamdani = json.loads(file.read())

# Данные для построения базы правил по алгоритму Синглтон
with open('data/singleton.json', 'r', encoding='utf-8') as file:
	singleton = json.loads(file.read())

mamdani_response = requests.post(f"{addr}{routes[0]}", json=mamdani)
print(mamdani_response.json())
"""
{'data': {'tip': 15.000000953674316}, 'message': 'ok', 'status': 200}
"""

singleton_response = requests.post(f"{addr}{routes[0]}", json=singleton)
print(singleton_response.json())
"""
{'data': {'result': 13.60206232004177}, 'message': 'ok', 'status': 200}
"""

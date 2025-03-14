import requests


# ----------------------
# Нечеткая аналитическая сеть

import json

with open("sets.json", encoding="utf-8") as file:
	addr = json.loads(file.read())["addr"]

routes = ["/api/fan/get"]

data = [
  {
    "start": "Start",
    "end": "A",
    "score": 0.67
  },
  {
    "start": "Start",
    "end": "A2",
    "score": 0.72
  },
  {
    "start": "A",
    "end": "B",
    "score": 0.76
  },
  {
    "start": "A2",
    "end": "B",
    "score": 0.76
  },
  {
    "start": "B",
    "end": "C",
    "score": 0.65
  },
  {
    "start": "C",
    "end": "D",
    "score": 0.7
  },
  {
    "start": "C",
    "end": "E",
    "score": 0.62
  },
  {
    "start": "D",
    "end": "End",
    "score": 0.62
  },
  {
    "start": "E",
    "end": "End",
    "score": 0.7
  }
]

fan_response = requests.post(f"{addr}{routes[0]}", json=data)

print(fan_response.json())
"""
{'data': {'best_alternative': ['A2', 'B'], 'most_feasible_path': ['Start', 'A2', 'B', 'C', 'E', 'End']}, 'message': 'ok', 'status': 200}
"""

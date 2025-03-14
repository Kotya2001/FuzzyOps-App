import requests
import json


with open("sets.json", encoding="utf-8") as file:
	addr = json.loads(file.read())["addr"]

routes = ["/api/fpred/get"]

# ----------------------
# Нечеткая линейная регрессия

# входные данные для построение нечеткой линейной регрессии
data = {
  "X": {
    "domain": {
      "start": 0,
      "end": 110,
      "step": 0.01,
      "name": "Temperature"
    },
    "data": [
      {
        "a": 18,
        "b": 20,
        "c": 22
      },
      {
        "a": 38,
        "b": 40,
        "c": 42
      },
      {
        "a": 58,
        "b": 60,
        "c": 62
      },
      {
        "a": 78,
        "b": 80,
        "c": 82
      },
      {
        "a": 98,
        "b": 100,
        "c": 102
      }
    ]
  },
  "Y": {
    "domain": {
      "start": 1,
      "end": 2,
      "step": 0.01,
      "name": "Transcalency"
    },
    "data": [
      {
        "a": 1.2,
        "b": 1.25,
        "c": 1.3
      },
      {
        "a": 1.28,
        "b": 1.35,
        "c": 1.42
      },
      {
        "a": 1.35,
        "b": 1.45,
        "c": 1.55
      },
      {
        "a": 1.5,
        "b": 1.62,
        "c": 1.74
      },
      {
        "a": 1.65,
        "b": 1.8,
        "c": 1.95
      }
    ]
  },
  "input": {
    "a": 98,
    "b": 100,
    "c": 102
  }
}

pred_response = requests.post(f"{addr}{routes[0]}", json=data)

print(pred_response.json())
"""
{'data': {'a': 0.010789935477077961, 'b': 0.8083937168121338, 'err': 0.40394705413186155, 'prediction': 1.8870618343353271}, 'message': 'ok', 'status': 200}
"""
import requests

addr = 'http://localhost:5000'

routes = ["/api/fuzzy_nn2/get"]

# ----------------------
# Нечеткая нейронная сеть, алгоритма 2

# входные данные для нечеткой нейронной сети, алгоритм 2
data = {
  "config": {
    "layerSize": [
      2,
      2,
      1
    ],
    "domainValues": [
      -100,
      100,
      1
    ],
    "method": "minimax",
    "fuzzyType": "triangular",
    "actiovationType": "linear",
    "epochs": 100
  },
  "X_Train": [
    [
      {
        "name": "Inside1",
        "params": [
          3,
          4,
          6
        ]
      },
      {
        "name": "Outside1",
        "params": [
          2,
          3,
          7
        ]
      }
    ],
    [
      {
        "name": "Inside2",
        "params": [
          2,
          3,
          5
        ]
      },
      {
        "name": "Outside2",
        "params": [
          3,
          5,
          6
        ]
      }
    ],
    [
      {
        "name": "Inside3",
        "params": [
          0,
          1,
          2
        ]
      },
      {
        "name": "Outside3",
        "params": [
          -1,
          0,
          1
        ]
      }
    ]
  ],
  "y_train": [
    [
      {
        "name": "Power1",
        "params": [
          -1,
          3,
          5
        ]
      }
    ],
    [
      {
        "name": "Power2",
        "params": [
          0,
          2,
          4
        ]
      }
    ],
    [
      {
        "name": "Power3",
        "params": [
          -1,
          0,
          3
        ]
      }
    ]
  ],
  "input_data": [
    {
      "name": "Inside",
      "params": [
        -1,
        0,
        1
      ]
    },
    {
      "name": "Outside",
      "params": [
        -1,
        2,
        3
      ]
    }
  ]
}

nn_response = requests.post(f"{addr}{routes[0]}", json=data)

print(nn_response.json())
"""
{'data': {'res': [4]}, 'message': 'ok', 'status': 200}
"""
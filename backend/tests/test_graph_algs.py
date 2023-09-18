import unittest
import json
import requests
from config import SERVER_HOST, SERVER_PORT

with open("graph_data.json") as file:
    data = json.loads(file.read())


class FuzzyGraph(unittest.TestCase):

    def setUp(self) -> None:
        self.data = data
        self.path_data = {"path": [1, 4],
                          "fileHash": "enchr3r3884h1nf04bgenchence8383"}
        self.n_clusters = {"fileHash": "enchr3r3884h1nf04bgenchence8383",
                           "cluster": 3}
        self.domin = {"fileHash": "enchr3r3884h1nf04bgenchence8383",
                      "dominating": [1, 3, 5]}

    def test_create_fgraph(self):
        """
        Создание нечеткого грфаф
        """
        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}/main/fuzzyLog/GetNumber",
                                 data=json.dumps(self.data))
        print(response.json())

    def test_shortest_path(self):
        """
        Поиск кратчайшего пути
        """
        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}'/main/fuzzyGraph/shortestPath/Get",
                                 data=json.dumps(self.path_data))
        print(response.json())

    def test_n_clusters(self):
        """
        Поиск числа кластеров
        """
        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}'/main/fuzzyGraph/Cluster/Get",
                                 data=json.dumps(self.n_clusters))
        print(response.json())

    def test_dominating(self):
        """
        Проверка на доминантность
        """

        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}'/main/fuzzyGraph/Dominating/check",
                                 data=json.dumps(self.domin))
        print(response.json())

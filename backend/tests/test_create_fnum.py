import unittest
import json
import requests
from config import SERVER_HOST, SERVER_PORT

with open("data.json") as file:
    data = json.loads(file.read())

f_ops_data = {"file_hash": "88f34hfdu34hdu34hd38hd",
              "paginationParams": {"currentPage": 0, "points": 100},
              "operation": "*"}


class FuzzyNumber(unittest.TestCase):

    def setUp(self) -> None:
        self.data = data
        self.ops_data = f_ops_data

    def test_create_fnum(self):
        """
        Создание нечеткого числа
        """
        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}/main/fuzzyGraph/create",
                                 data=json.dumps(self.data))
        print(response.json())

    def test_shortestpath(self):
        """
        Операция над нечеткими числами
        """
        response = requests.post(f"{SERVER_HOST}://{SERVER_PORT}/main/fuzzyLog/fuzzyOps",
                                 data=json.dumps(self.ops_data))
        print(response.json())

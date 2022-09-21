from backend import main
from backend.test_data import user_1

import json

import unittest


class TestRegistration(unittest.TestCase):

    def setUp(self):
        main.app.testing = True
        self.app = main.app.test_client()

    def test_registration(self):
        with main.app.app_context():
            result = self.app.post('/registration', data=json.dumps(user_1))
            assert result.status_code == 200
            assert result.get_json()['status'] == 'ok'

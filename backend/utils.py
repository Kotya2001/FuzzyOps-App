"""
Вспомогательные функциия для сервиса
"""

import secrets


def generate_secrete_key(lenght: int = 72):
    return secrets.token_urlsafe(lenght)

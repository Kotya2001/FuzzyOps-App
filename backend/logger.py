"""
Фйал для логирования
"""
import logging
import os
from colorlog import ColoredFormatter

from config import LOG_LEVEL, LOG_FORMAT, DIRECTORY_OF_LOGS
import sys


def logger(name: str):
    """
    Функция для сбора логов на backend
    """
    script_name = os.path.basename(sys.argv[0]).replace('.py', '')
    filename = '{}.log'.format(script_name)
    try:
        logging.basicConfig(
            filename=DIRECTORY_OF_LOGS + "/" + filename,
            level=LOG_LEVEL,
            format=LOG_FORMAT,
        )
    except BaseException as e:
        print("Base except logger {}".format(e))

    logger = logging.getLogger(name)
    logger.setLevel(LOG_LEVEL)
    logging.root.setLevel(LOG_LEVEL)

    formatter = ColoredFormatter(LOG_FORMAT)

    stream = logging.StreamHandler()

    stream.setLevel(LOG_LEVEL)
    stream.setFormatter(formatter)
    logger.addHandler(stream)
    return logger

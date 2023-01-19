"""
Вспомогательные функциия для сервиса
"""

import os


def remove_time_dirs(list_dirs, is_remove_dir=True) -> None:
    """
    Функция для удаления ненужных папок после каждого запроса
    """

    for dirs in list_dirs:
        try:
            if len(os.listdir(dirs)) == 0:
                if is_remove_dir:
                    os.rmdir(dirs)
                pass
            else:
                for file in os.listdir(dirs):
                    os.remove(dirs + '/' + file)
                if is_remove_dir:
                    os.rmdir(dirs)
        except Exception:
            continue


# функция для создания файла
def create_file(full_path, filename, directory):
    if filename not in os.listdir(directory):
        f = open(full_path, "x")
        f.close()
    else:
        pass

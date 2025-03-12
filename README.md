# FuzzyOps-App
Веб-сервис для работы c библиотекой FuzzyOps

 * https://pypi.org/project/fuzzyops/
 * https://github.com/Kotya2001/FuzzyOps/tree/main

# Описание

 * https://github.com/Kotya2001/FuzzyOps-App/tree/main/backend - папка с исходными кодами backend веб-сервиса
 * https://github.com/Kotya2001/FuzzyOps-App/tree/main/frontend - папка с исходными кодами графического интерфейса (в браузере) веб-сервиса
 * https://github.com/Kotya2001/FuzzyOps-App/wiki/Инструкция-по-использованию-алгоритмов-в-веб%E2%80%90серсиве-(по-API) - инструкция по использованию алгоритмов библиотеки по RESTful API
 * https://github.com/Kotya2001/FuzzyOps-App/wiki/Инструкция-по-использованию-алгоритмов-через-веб%E2%80%90интерфейс - инструкция по использованию алгоритмов библиотеки через веб-интерфейс

# Инструкция по установке (развертыванию)

## Обычное развертывание

Для развертывания веб-сервиса необходимо:

 1. Склонировать репозиторий проекта;
 2. Установить в систему резидентную базу данных Redis (https://github.com/redis/redis, https://redis.io), после установки по умолчанию используется адрес доступа к базе данных `localhost:6379`;
 3. Далее необходимо запустить backend веб-сервера для этого:
  * Установить Python версии выше 3.10 в систему;
  * Перейти в папку проекта, затем ```bash cd backend```;
  * Создать виртуальное окружение `Полный путь к исполняемому файлу Python 3.10 -m venv env`;
  * Активировать виртуальное окружение `Macos: source env/bin/activate`, `Windows: .\env\Scripts\activate`, `Linux: source env/bin/activate`;
  * Установить зависимости в окружении командой  `pip install -r requirements.txt`
  * Запустить backend командой `python3 main.py`;
  При этом необходимо отредактировать (если это необходимо, рекомендуется пользоваться уже готовым файлом) настройки для запуска бекенда веб-сервиса в файла backend/sets.json:
   
   ```json
   {
	"REDIS_PORT": 6379,
	"REDIS_HOST": "0.0.0.0",
	"DB": 0,
	"SERVER_HOST": "0.0.0.0",
	"SERVER_PORT": 5000
	}
   ```

   где:
    * REDIS_PORT - порт базы данных redis;
	* REDIS_HOST - адрес базы данных redis;
	* DB - номер базы данных, с которой необходимо работать;
	* SERVER_HOST - адрес веб-сервера (python flask);
	* SERVER_PORT - порт веб-сервера (python flask).


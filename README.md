# FuzzyOps-App
Веб-сервис для работы c библиотекой FuzzyOps

 * https://pypi.org/project/fuzzyops/
 * https://github.com/Kotya2001/FuzzyOps/tree/main

# Описание основных папок с файлами

 * https://github.com/Kotya2001/FuzzyOps-App/tree/main/backend - папка с исходными кодами backend веб-сервиса
 * https://github.com/Kotya2001/FuzzyOps-App/tree/main/frontend - папка с исходными кодами графического интерфейса (в браузере) веб-сервиса
 * https://github.com/Kotya2001/FuzzyOps-App/tree/main/posters - папка с примерами (на языке Python) и данными по отправки запросов на веб-сервис по API
 * https://github.com/Kotya2001/FuzzyOps-App/wiki/Инструкция-по-использованию-алгоритмов-в-веб%E2%80%90серсиве-(по-API) - инструкция по использованию алгоритмов библиотеки по RESTful API
 * https://github.com/Kotya2001/FuzzyOps-App/wiki/Инструкция-по-использованию-алгоритмов-через-веб%E2%80%90интерфейс - инструкция по использованию алгоритмов библиотеки через веб-интерфейс

# Инструкция по установке (развертыванию)

## Обычное развертывание

Для развертывания веб-сервиса необходимо:

 1. Склонировать репозиторий проекта;
 2. Установить в систему резидентную базу данных Redis (https://github.com/redis/redis, https://redis.io), после установки по умолчанию используется адрес доступа к базе данных `localhost:6379`;
 3. Далее необходимо запустить backend веб-сервера для этого:
  * Установить Python версии выше 3.10 в систему;
  * Перейти в папку проекта, затем в папку **backend** ```cd backend```;
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

4. После запуска backend и базы данных Redis можно обращаться по API согласно документации (https://github.com/Kotya2001/FuzzyOps-App/wiki/Инструкция-по-использованию-алгоритмов-в-веб%E2%80%90серсиве-(по-API));
5. Для работы с алгоритмами через Веб-интерфейс необходимо:
  * Запустить Redis, согласно пункту 2, запустить backend согласно пункту 3;
  * Установить в систему node js (версии 20 и выше), npm (версии 10 и выше) (https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/, https://nodejs.org/en/download);
  * Далее необходимо перейти в папку frontend `cd frontend`, затем в папку fuzzyops `cd fuzzyops`;
  * выполнить команду для установки зависимостей `npm install`;
  * Заметм, для запуска в режимер разработки выполнить `npm run dev`, для реального режима работы необходимо сначала выполнить `npm run build`, затем `npm start`;
  * По умполчанию запуск происходит по адресу `http://localhost:3000`, в браузере необходимо открыть эту страницу;
  * Для изменения адреса запуска необходимо отредактировать файл настроек package.json - в ключе "scripts", для запуска в режиме разработки (ключ "dev") указать `next dev -p PORT -H host`, например,
  `next dev -p 9000 -H 0.0.0.0` - запуститcя на адресе `http://0.0.0.0:9000`, аналогично можно сделать и для команды "start" - `next start -p 9000 -H 0.0.0.0`. 


## Запуск примеров

Для запуска примеров из **posters** (Рекомендуется запускать в отдельно окружении) необходимо:
  * Запустить базу данных Redis;
  * Установить Python версии выше 3.10 в систему;
  * Перейти в папку проекта, затем в папку **posters** ```cd posters```;
  * Создать виртуальное окружение `Полный путь к исполняемому файлу Python 3.10 -m venv env_posters`;
  * Активировать виртуальное окружение `Macos: source env_posters/bin/activate`, `Windows: .\env_posters\Scripts\activate`, `Linux: source env_posters/bin/activate`;
  * Установить зависимости в окружении командой  `pip install -r requirements.txt` (или достаточно просто установить библиотеку requirements);
  * `python3 poster.py` - Отправляетс данные для работы с нечеткими числами;
  * `python3 fgraph_poster.py` - Отправляет данные для работы с нечеткими графами;
  * `python3 fuzzy_logic_poster.py` - Отправляет данные для работы с нечеткой логикой (построение базы правил);
  * `python3 fuzzy_linear_opt.py` - Отправляет данные для работы с нечеткой линейной оптимизации;
  * `python3 fuzzy_metaev_poster.py` - Отправляет данные для работы с нечеткой метаэвристической оптимизации;
  * `python3 fuzzy_nn.py` - Отправляет данные для работы с нечеткой нейронной сетью (алгоритм ANFIS);
  * `python3 fuzzy_nn2.py` - Отправляет данные для работы с нечеткой нейронной сетью (алгоритм 2);
  * `python3 fuzzy_msa.py` - Отправляет данные для работы с нечеткими методами многритериального анализа;
  * `python3 fuzzy_prediction.py` - Отправляет данные для работы с нечетким прогнозированием;
  * `python3 fan.py` - Отправляет данные для работы нечеткой аналитической сетью;

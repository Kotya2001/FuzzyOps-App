# Dockerfile for Flask Backend
FROM python:3.10-slim

# RUN apt-get update && \
# 	apt-get install -y python3.10 python3.10-dev python3-pip && \
# 	rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код приложения
COPY . .

# Определяем переменную окружения
ENV FLASK_APP=app.py

# Открываем порт
EXPOSE 5000

# Команда для запуска приложения
CMD ["python3", "main.py"]
# Базовый образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей и устанавливаем их
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем весь код приложения
COPY . .

# Строим приложение
RUN npm run build

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
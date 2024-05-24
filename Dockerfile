# Используем образ node для сборки нашего приложения
FROM node:18 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Используем образ nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем собранные файлы из стадии сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем файл конфигурации nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

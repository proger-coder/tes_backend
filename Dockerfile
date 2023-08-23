# Начало от официального образа Node.js
FROM node:latest

# Установка рабочей директории
WORKDIR /app

# Копирование файлов package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода приложения
COPY . .

# Объявление порта, который будет прослушиваться приложением
EXPOSE 2024

# Install Prisma CLI
RUN npm install prisma --save-dev

# Generate Prisma Client
RUN npx prisma generate

# Сборка приложения
RUN npm run build

# Запуск приложения
CMD [ "npm", "run", "start:prod" ]
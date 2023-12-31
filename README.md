---
![Banking Management](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgm7raARmssEHRY9ibFbKBT8pfYDoxFK3rldwNGDwT35m1URa3cXhZaxRIVfCWcZZs51lhjdJci7iANFIQ1A-whO4IcXKbqkiBtlJd5dvEn2Diq4Bw_bnGo5p6az8-XsZ5nJ6D84IEIGvRyLQqsQUxoz2s_SQ5WLLFskUeljAVOr8niwX4iKdP0Ahpl/s16000/Clipboard01.jpg)
# Управление банковским аккаунтом

📜 **[Задание](https://github.com/proger-coder/tes_backend/blob/master/taskDescription.md)**: детальное описание задачи.

## 🎯 Описание решения

Этот проект - реализация системы управления банковскими аккаунтами, созданная с использованием следующих технологий:

- Postgres
- Node.js
- NestJS
- Swagger
- Git
- TypeScript

### Основные функции:

- ✅ **Создание аккаунта**
- 💰 **Пополнение счета**
- 🧾 **Получение текущего баланса**
- 💸 **Снятие со счета**
- 🔒 **Блокировка аккаунта**
- 📈 **История транзакций**
- 🛑 **Ограничение по количеству запросов на получение текущего счета в день**
- 🛡️ **Проверка источника запроса**

## 🖊 Комментарии по выполнению

- 🛑 **Снятие со счета:** предусмотрена ситуация, когда пользователь пытается снять с счета больше, чем доступно.
- 🔒 **Заблокированные аккаунты:** баланс смотреть можно, а пополнять и списывать нельзя.
- 📑 **IP-адреса:** создана отдельная таблица для хранения списка "белых" IP.
- ➕ **Эндпоинты для IP:** для занесения и удаления IP из таблицы созданы эндпоинты в контроллере Account.

## 🔗 Полезные ссылки
- 🧾 [Инструкция по запуску](https://github.com/proger-coder/tes_backend/blob/master/startupGuide.md).
- 🌐 [Запущенный работающий backend на VPS](http://193.17.92.118:2024/)
- 📚 [Документация Swagger](http://193.17.92.118:2024/api)
- 📁 [Гитхаб проекта](https://github.com/proger-coder/tes_backend)

## 📞 Контакты

**Автор:** Айрат  
📱 **Телефон:** +7-987-207-1-444  
📬 **Telegram:** [Ayra_t](https://t.me/Ayra_t)

---

💼 *Спасибо за внимание!*
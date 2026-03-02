# План разработки

## Сделано

- [x] UI: выбор суммы (пресеты + своя)
- [x] UI: сообщение автору
- [x] UI: экран оплаты (заглушка)
- [x] UI: экран благодарности с анимацией
- [x] Стиль iOS Dark Mode
- [x] Адаптирован под мобильный экран

## Следующие шаги

### 1. Деплой ✅
- [x] Создать репозиторий на GitHub — github.com/OlaPost/donat
- [x] Подключить Vercel (автодеплой при каждом сохранении)
- [x] Получить публичный URL — **donat-two.vercel.app**

### 2. Telegram-бот ✅
- [x] Создать бота — @olapost_donat_bot
- [x] Подключить Mini App — t.me/olapost_donat_bot/donat
- [x] Проверить открытие в Telegram

### 3. Платёжка (код готов, нужна настройка)
- [x] Выбрать платёжную систему — Telegram Payments + ЮКасса
- [x] Написать серверный код (api/create-invoice.ts, api/webhook.ts)
- [x] Заменить заглушку на реальный платёж (PayScreen.tsx)
- [ ] Зарегистрироваться на ЮКасса (yukassa.ru)
- [ ] Подключить ЮКасса к боту: BotFather → /mybots → @olapost_donat_bot → Payments → получить YUKASSA_TOKEN
- [ ] Узнать свой AUTHOR_CHAT_ID (написать @userinfobot)
- [ ] Добавить переменные в Vercel: BOT_TOKEN, YUKASSA_TOKEN, AUTHOR_CHAT_ID
- [ ] Зарегистрировать webhook (ссылка будет дана после деплоя)

### 4. Уведомления автору (код готов)
- [x] При успешном донате — отправить сообщение автору в Telegram
- [x] Показать сумму и сообщение от донатера

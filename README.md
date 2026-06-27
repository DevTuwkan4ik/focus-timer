# ⏱️ Focus Timer

Минималистичный **Pomodoro-таймер** для концентрации на чистом HTML, CSS и JavaScript — без фреймворков и зависимостей.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## ✨ Возможности

- Три режима: **Работа** (25 мин), **Короткий перерыв** (5 мин), **Длинный перерыв** (15 мин)
- Анимированное кольцо прогресса (SVG)
- Управление с клавиатуры: **Пробел** — старт / пауза
- Счётчик завершённых рабочих сессий за день (хранится в `localStorage`)
- Браузерные уведомления о завершении сессии
- Адаптивная вёрстка, тёмная тема

## 🚀 Запуск

Зависимостей нет — достаточно открыть `index.html` в браузере:

```bash
git clone https://github.com/DevTuwkan4ik/focus-timer.git
cd focus-timer
# открыть index.html двойным кликом или через локальный сервер:
npx serve .
```

## 🌐 Демо

После публикации через **GitHub Pages** живая версия будет доступна по адресу:

```
https://DevTuwkan4ik.github.io/focus-timer/
```

> Как включить Pages: репозиторий → **Settings → Pages → Source: Deploy from a branch → main / root**.

## 🧱 Структура

```
focus-timer/
├── index.html   # разметка
├── style.css    # стили и тема
└── app.js       # логика таймера и статистики
```

## 📝 Лицензия

[MIT](LICENSE)

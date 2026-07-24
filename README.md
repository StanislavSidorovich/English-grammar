# Английская грамматика A1–B2

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/screenshot-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/screenshot-light.png">
  <img alt="Скриншот приложения — Английская грамматика A1–B2" src="assets/screenshot-light.png" width="800">
</picture>

Офлайн-курс английской грамматики для самостоятельного изучения. Один HTML-файл, без сервера, без регистрации, без рекламы. Работает как PWA — можно установить на экран телефона и заниматься без интернета.

**Открыть демо:** https://stanislavsidorovich.github.io/English-grammar/

## Что внутри

- **44 темы от A1 до B2** — базовые времена, модальные глаголы, страдательный залог, условные предложения (включая Third и Mixed Conditional), каузатив и другие конструкции продвинутого уровня
- Каждая тема: **правило** (с примерами, сравнением похожих конструкций и разбором типичных ошибок) → **тексты для чтения** (истории, диалоги на бытовые темы) → **задания** с автопроверкой
- **Тесты по каждому уровню** — A1 (13 вопросов), времена A2 (12), B1 (15), B2 (10) — плюс общий **диагностический тест** на 20 вопросов по всему курсу. Вопросы каждый раз выбираются заново из пула вариантов, так что тест не повторяется один в один
- **«Стоит повторить»** — блок сам подсвечивает темы с высоким процентом ошибок в квизах
- **Метр прогресса до полного B2** — честно показывает, сколько тем реально пройдено по каждому уровню
- Бонус: адаптированная книга для чтения («Around the World in 80 Days», 3 главы), закрепляет грамматику из пройденных тем в связной истории
- Шпаргалки — структура предложения, времена, неправильные глаголы (с объяснением, что такое V1/V2/V3), базовые темы A1
- Тёмная тема и регулировка размера шрифта
- Прогресс сохраняется локально в браузере (localStorage) — никакие данные никуда не отправляются

## Технологии

Чистый HTML/CSS/JavaScript. Без фреймворков, без сборки, без зависимостей — открывается напрямую в браузере. PWA: manifest + service worker, работает офлайн после первого открытия, шрифты подключены локально (не через CDN).

## Как запустить

Скачай `index.html` (и `sw.js`, `manifest.json`, папку `assets`) и открой `index.html` в любом браузере. Либо размести на GitHub Pages / Netlify / Vercel для доступа по ссылке — либо просто открой готовое демо выше и добавь на экран телефона.

## Кому подходит

Курс рассчитан на тех, кто уже читает по-английски и знает базовую лексику — это грамматика, а не курс с нуля. Алфавит, произношение и первые слова сюда не входят.

## Известные ограничения

- Прогресс хранится только в этом браузере на этом устройстве (localStorage) — нет аккаунта и синхронизации между устройствами
- Проверка ответов происходит на клиенте, коды ответов видны в исходном коде страницы — не подходит для формальной аттестации
- Задания внутри отдельной темы фиксированные: при повторном прохождении той же темы вопросы не меняются (в отличие от итоговых тестов, где вопросы каждый раз перемешиваются из пула)

## Автор

Stanislav Sidorovich · Алматы · [LinkedIn](https://www.linkedin.com/in/stanislavsidorovich)

## Лицензия

MIT — см. LICENSE

---

## 🇬🇧 English

Offline, single-file English grammar course (A1–B2) — no backend, no build step, no framework. Works as a PWA: installable, works fully offline after the first load.

**Live demo:** https://stanislavsidorovich.github.io/English-grammar/

44 topics, each with a rule (with contrast and common-mistakes notes), reading texts, and an auto-checked quiz. Level tests (A1: 13 questions, tenses: 12, B1: 15, B2: 10) plus a 20-question diagnostic test covering the whole course, each pulling a fresh set of questions from a pool on every attempt. Includes a review-by-error-rate section, a progress meter per level, and a bonus adapted reading book ("Around the World in 80 Days", 3 chapters). Progress is stored in `localStorage`; nothing is sent anywhere. Built for learners who already read English and know basic vocabulary — this is a grammar course, not a from-scratch beginner course.

**Known limitations:** progress doesn't sync across devices (no account); answer keys are visible in page source (not suitable for formal testing); quiz questions within a single topic don't rotate between attempts (only the level tests do).

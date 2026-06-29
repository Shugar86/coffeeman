# ☕ CoffeeMan

> Интернет-магазин кофе и чая, в котором хочется задержаться — как в любимой кофейне у дома.

<!-- badge-линия -->
[![License: MIT](https://img.shields.io/badge/License-MIT-8B1538.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-5D4037.svg)](./CHANGELOG.md)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Payload CMS](https://img.shields.io/badge/Payload-3-8B1538)](https://payloadcms.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)](./docker-compose.yml)

```text
        ( (
         ) )
      ........
      |      |]
      \      /
       `----'
   CoffeeMan
```

## Что это

**CoffeeMan** — полноценная витрина кофе и чая с корзиной, оформлением заказа, блогом и картой кофеен. Сделан на **Next.js 15** с **Payload CMS 3** в роли админки и **PostgreSQL** под капотом.

Проект родился как способ быстро собрать красивый e-commerce без связывания пяти разных сервисов. Вдохновлён тёплыми макетами из Pixso: бежевые фоны, акцентный марсала, эффекты «рваной бумаги» и полароидов. Цель — чтобы покупатель чувствовал себя не на сайте, а в уютной кофейне.

## Возможности

- 🛒 **Каталог** с фильтрами, сегментами и карточками товара с hover-анимациями
- 📦 **Корзина и оформление заказа** с валидацией через Zod
- ☕ **Карта кофеен** на Яндекс.Картах
- 📝 **Блог** со статьями и галереей
- ⚙️ **Админка Payload** для товаров, заказов, категорий, страниц и настроек
- 🎨 **Дизайн-система** из Pixso: цвета, типографика, компоненты, эффекты
- 🐳 **Docker-окружение** для локальной разработки и продакшена
- 🧪 **Скрипты проверки** качества данных и схемы

## Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone git@github.com:Shugar86/coffeeman.git
cd coffeeman

# 2. Подготовить окружение
cp .env.example .env
# Отредактируй .env: PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL и т.д.

# 3. Поднять PostgreSQL (порт 5433, чтобы не конфликтовать с другими Postgres)
docker compose up -d

# 4. Установить зависимости
npm install

# 5. Применить миграции
npx cross-env NODE_OPTIONS=--no-deprecation payload migrate

# 6. Запустить dev-сервер
npm run dev
```

После запуска:

- Витрина: [http://localhost:3000](http://localhost:3000)
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin) — создай первого пользователя при первом входе.

> 💡 Если Docker недоступен, убедись, что `DATABASE_URL` в `.env` указывает на рабочий PostgreSQL.

## Архитектура / стек

```text
┌─────────────────────────────────────────────────────────────┐
│  Next.js 15 App Router                                      │
│  ├── (site)      → витрина, каталог, корзина, блог          │
│  └── (payload)   → админка / API                            │
├─────────────────────────────────────────────────────────────┤
│  Payload CMS 3  ──►  PostgreSQL 16                          │
├─────────────────────────────────────────────────────────────┤
│  Zustand (cart)  │  Zod (forms)  │  Nodemailer (mail)       │
└─────────────────────────────────────────────────────────────┘
```

| Область | Технология | Назначение |
|---------|------------|------------|
| Frontend | Next.js 15 (App Router), React 19 | SSR/SSG витрины и админки |
| Стили | Tailwind CSS 4, `design-system.css` | Атомарные + кастомные стили |
| Анимации | Framer Motion | Мягкие hover-эффекты и переходы |
| CMS / Admin | Payload CMS 3 | Headless CMS, админка, API |
| База данных | PostgreSQL 16 | Хранение товаров, заказов, контента |
| Валидация | Zod | Формы оформления заказа |
| Состояние корзины | Zustand | Локальный и персистентный стор |
| Почта | Nodemailer | Уведомления менеджеру |
| Контейнеризация | Docker + docker compose | Единое окружение dev/prod |

## Структура проекта

```text
coffeeman/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (site)/             # Публичная витрина
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── cafes/
│   │   │   ├── cart/
│   │   │   ├── catalog/
│   │   │   ├── checkout/
│   │   │   ├── contacts/
│   │   │   ├── delivery/
│   │   │   └── thank-you/
│   │   └── (payload)/          # Админка и API Payload
│   ├── collections/            # Payload: Products, Orders, Articles, Cafes и др.
│   ├── components/             # React-компоненты
│   │   ├── blog/
│   │   ├── cart/
│   │   ├── catalog/
│   │   ├── checkout/
│   │   ├── product/
│   │   ├── site/
│   │   └── ui/
│   ├── globals/                # Глобальные настройки (SEO, доставка, оплата, сайт)
│   ├── lib/                    # Утилиты и хелперы
│   ├── migrations/             # Миграции PostgreSQL
│   ├── stores/                 # Zustand-сторы (корзина)
│   └── styles/                 # design-system.css
├── public/                     # Статика и изображения
├── design/                     # Макеты, скриншоты и инструкции по Pixso
├── scripts/                    # Вспомогательные скрипты
│   ├── backup-db.sh            # Бэкап PostgreSQL
│   └── verify-products-images.mjs
├── docker-compose.yml          # Локальная БД
├── Dockerfile                  # Продакшен-сборка Next.js standalone
├── next.config.ts              # Конфиг Next.js
├── payload.config.ts           # Конфиг Payload
├── tsconfig.json               # TypeScript
└── .env.example                # Шаблон переменных окружения
```

## 📍 С чего начать чтение

Чтобы разобраться в проекте за ~15 минут, читай в таком порядке:

1. **`src/payload.config.ts`** — точка сборки: какие коллекции и глобалы подключены к Payload CMS.
2. **`src/collections/`** — модель данных: `Products`, `Orders`, `Articles`, `Cafes` и др. Здесь живут поля, хуки и доступы.
3. **`src/app/(site)/`** — публичная витрина: каталог, корзина, checkout. Рядом `src/app/(payload)/` — админка и API.

## Примеры

### Добавить товар через админку

1. Открой [http://localhost:3000/admin](http://localhost:3000/admin).
2. Создай пользователя при первом входе.
3. В коллекции **Products** добавь товар: название, цену, изображения, категорию, страну.
4. Сохрани — товар появится в каталоге.

### Оформить заказ

```bash
# 1. Запусти dev-сервер
npm run dev

# 2. Открой http://localhost:3000/catalog
# 3. Добавь товары в корзину
# 4. Перейди к оформлению — форма валидируется через Zod
```

### Применить миграции после изменения коллекции

```bash
npx cross-env NODE_OPTIONS=--no-deprecation payload migrate
npm run generate:types
npm run generate:importmap
```

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Разработка Next.js |
| `npm run build` | Продакшен-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | ESLint |
| `npm run generate:importmap` | Обновить admin import map Payload |
| `npm run generate:types` | Сгенерировать `payload-types.ts` |
| `npx payload migrate` | Применить миграции БД |
| `npm run verify:upload` | Проверить схему загрузок товаров |

## Дизайн

Макеты живут в `design/`. Подробнее — в [`design/README.md`](./design/README.md), [`DESIGN_IMPLEMENTATION.md`](./DESIGN_IMPLEMENTATION.md) и [`ADVANCED_DESIGN_EFFECTS.md`](./ADVANCED_DESIGN_EFFECTS.md).

> Тяжёлый PDF-экспорт из Pixso в git не коммитится — используйте PNG-скриншоты и инструкции для агентов.

## Продакшен

Сборка и деплой через Docker:

```bash
# В .env укажи PAYLOAD_SECRET, DATABASE_URL и NEXT_PUBLIC_SERVER_URL=https://<твой-домен>
docker build --build-arg PAYLOAD_SECRET="$PAYLOAD_SECRET" -t coffeeman .
docker run -d -p 3000:3000 --env-file .env --name coffeeman-web coffeeman
```

После запуска контейнера примени миграции:

```bash
docker exec coffeeman-web npx payload migrate
```

> 💡 `docker-compose.yml` поднимает только PostgreSQL для разработки. Для продакшена используй Dockerfile напрямую или свой оркестратор.

Бэкап базы: [`scripts/backup-db.sh`](./scripts/backup-db.sh).

## Дорожная карта / CHANGELOG

См. [CHANGELOG.md](./CHANGELOG.md).

## Участие

Идеи, баг-репорты и PR приветствуются — см. [CONTRIBUTING.md](./CONTRIBUTING.md).

## Характер проекта

**Вайб:** `warm` — «как в любимой кофейне у дома».

1. **Тепло, а не витрина.** Бежевые фоны, марсала, эффекты бумаги и полароидов — покупатель чувствует уют, а не интерфейс.
2. **Мягкая динамика.** Hover-анимации и переходы поддерживают настроение, но не мешают дойти до корзины.
3. **Без давления.** Никаких всплывающих «КУПИ СЕЙЧАС!» и таймеров — продаёт атмосфера, а не агрессивный маркетинг.

---

## Лицензия

[MIT](./LICENSE) © 2026 Shugar86

---

Сделано с любовью к кофе и коду ☕

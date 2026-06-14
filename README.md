# CoffeeMan

> Интернет-магазин кофе и чая, в котором хочется задержаться — как в любимой кофейне у дома.

<!-- badge-линия -->
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload-3-8B1538)](https://payloadcms.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)

## Что это

**CoffeeMan** — полноценная витрина кофе и чая с корзиной, оформлением заказа, блогом и картой кофеен. Сделан на Next.js 15 с Payload CMS 3 в роли админки и PostgreSQL под капотом.

Проект родился как способ быстро собрать красивый e-commerce без связывания пяти разных сервисов. Вдохновлён тёплыми макетами из Pixso: бежевые фоны, акцентный марсала, эффекты «рваной бумаги» и полароидов.

## Возможности

- 🛒 **Каталог** с фильтрами, сегментами и карточками товара с hover-анимациями
- 📦 **Корзина и оформление заказа** с валидацией через Zod
- ☕ **Карта кофеен** на Яндекс.Картах
- 📝 **Блог** со статьями и галереей
- ⚙️ **Админка Payload** для товаров, заказов, категорий, страниц и настроек
- 🐳 **Docker-окружение** для локальной разработки и продакшена

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

- Витрина: [http://localhost:3000](http://localhost:3000)
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin) — создай первого пользователя при первом входе.

## Архитектура / стек

| Область | Технология |
|---------|------------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion |
| CMS / Admin | Payload CMS 3 |
| База данных | PostgreSQL 16 |
| Валидация | Zod |
| Состояние корзины | Zustand |
| Почта | Nodemailer |
| Контейнеризация | Docker + docker compose |

## Структура проекта

```text
coffeeman/
├── src/
│   ├── app/              # Next.js App Router: (site) + (payload) админка
│   ├── collections/      # Payload: Products, Orders, Articles, Cafes и др.
│   ├── components/       # React-компоненты: site, ui, catalog, cart, checkout
│   ├── globals/          # Глобальные настройки Payload (SEO, доставка, оплата)
│   ├── lib/              # Утилиты и хелперы
│   ├── migrations/       # Миграции PostgreSQL
│   ├── stores/           # Zustand-сторы (корзина)
│   └── styles/           # design-system.css
├── public/               # Статика и изображения
├── design/               # Макеты, скриншоты и инструкции по Pixso
├── scripts/              # Вспомогательные скрипты (бекап БД и т.д.)
├── docker-compose.yml    # Локальная БД
├── Dockerfile            # Продакшен-сборка Next.js standalone
└── .env.example          # Шаблон переменных окружения
```

## Скрипты

| Команда | Назначение |
|--------|------------|
| `npm run dev` | Разработка Next.js |
| `npm run build` / `npm start` | Продакшен-сборка и запуск |
| `npm run lint` | ESLint |
| `npm run generate:importmap` | Обновить admin import map Payload |
| `npm run generate:types` | Сгенерировать `payload-types.ts` |
| `npx payload migrate` | Применить миграции БД |

## Дизайн

Макеты живут в `design/`. Подробнее — в [`design/README.md`](./design/README.md), [`DESIGN_IMPLEMENTATION.md`](./DESIGN_IMPLEMENTATION.md) и [`ADVANCED_DESIGN_EFFECTS.md`](./ADVANCED_DESIGN_EFFECTS.md).

> Тяжёлый PDF-экспорт из Pixso в git не коммитится — используйте PNG-скриншоты и инструкции для агентов.

## Продакшен

Сборка и деплой через Docker:

```bash
# В .env укажи PAYLOAD_SECRET и NEXT_PUBLIC_SERVER_URL=https://<твой-домен>
docker compose up -d --build coffeeman-db coffeeman-web
docker compose exec coffeeman-web npx payload migrate
```

Бэкап базы: [`scripts/backup-db.sh`](./scripts/backup-db.sh).

## Лицензия

MIT — см. [LICENSE](./LICENSE).

---

Сделано с любовью к кофе и коду ☕

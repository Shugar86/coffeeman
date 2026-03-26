# CoffeeMan

Интернет-магазин кофе и чая: **Next.js 15** (App Router) + **Payload CMS 3** + **PostgreSQL**.

## Требования

- Node.js **≥ 20.9**
- Docker (для локальной PostgreSQL)

## Быстрый старт

1. Скопируйте окружение:

   ```bash
   cp .env.example .env
   ```

2. Поднимите базу (порт **5433** на хосте, чтобы не конфликтовать с другими Postgres):

   ```bash
   docker compose up -d
   ```

3. Установите зависимости и примените миграции:

   ```bash
   npm install
   npx cross-env NODE_OPTIONS=--no-deprecation payload migrate
   ```

4. Сгенерируйте import map после изменений коллекций:

   ```bash
   npm run generate:importmap
   npm run generate:types
   ```

5. Запуск dev:

   ```bash
   npm run dev
   ```

- Витрина: [http://localhost:3000](http://localhost:3000)
- Админка Payload: [http://localhost:3000/admin](http://localhost:3000/admin) — создайте первого пользователя при первом заходе.

## Макеты

См. [design/README.md](./design/README.md) и `design/screenshots/`. Тяжёлый PDF в git не коммитится (см. `.gitignore`).

## Продакшен на VDS

Из `/opt/projects`:

```bash
# Создайте coffeeman/.env (PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL=https://ваш-домен)
# Опционально: COFFEEMAN_DB_PASSWORD в окружении shell или в .env корня проектов
docker compose up -d --build coffeeman-db coffeeman-web
docker compose exec coffeeman-web npx payload migrate
```

Прокси **nginx** → `127.0.0.1:3010`, SSL через certbot (см. [RUNBOOK.md](../RUNBOOK.md)).

**Бэкап БД:** [scripts/backup-db.sh](./scripts/backup-db.sh) (контейнер `coffeeman-db`).

Общие правила: [DEV_GUIDE.md](../DEV_GUIDE.md), каталог сервисов: [PROJECT_CATALOG.md](../PROJECT_CATALOG.md).

## Скрипты

| Команда | Назначение |
|--------|------------|
| `npm run dev` | Разработка Next |
| `npm run build` / `npm start` | Прод-сборка |
| `npm run generate:importmap` | Обновить admin import map |
| `npm run generate:types` | Типы Payload → `payload-types.ts` |
| `npx payload migrate` | Применить миграции БД |

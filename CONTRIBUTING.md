# Как участвовать в CoffeeMan

CoffeeMan — персональный проект, но идеи, баг-репорты и PR приветствуются. Вайб продукта: **calm** — «утренний кофе без суеты». Всё, что попадает в репозиторий, должно сохранять тёплый, спокойный характер.

## Быстрый путь от форка до PR

1. **Сделай форк** репозитория и клонируй свой форк:

   ```bash
   git clone git@github.com:<your-username>/coffeeman.git
   cd coffeeman
   ```

2. **Создай ветку** с понятным названием:

   ```bash
   git checkout -b feature/short-description
   # или
   git checkout -b fix/bug-description
   ```

3. **Подготовь окружение**:

   ```bash
   cp .env.example .env
   docker compose up -d
   npm install
   npx cross-env NODE_OPTIONS=--no-deprecation payload migrate
   npm run dev
   ```

4. **Внеси изменения**. Старайся придерживаться **минимального diff** и **KISS**.

5. **Проверь качество**:

   ```bash
   npm run lint
   npm run build
   ```

6. **Если менял коллекции Payload**, запусти:

   ```bash
   npm run generate:types
   npm run generate:importmap
   ```

7. **Закоммить** с понятным сообщением:

   ```bash
   git commit -m "feat: add new catalog filter"
   ```

8. **Открой PR** с кратким описанием:
   - Что изменилось
   - Зачем
   - Как проверял

## Стиль кода

- **TypeScript строго**, без `any` без необходимости.
- **Tailwind-классы** по возможности; кастомные стили — через `src/styles/design-system.css` и CSS-переменные.
- **Компоненты группируются по смыслу**: `site/`, `ui/`, `catalog/`, `cart/`, `checkout/`, `blog/`.
- **Не коммить** `.env`, ключи, токены, `node_modules/`, `__pycache__/`, большие бинарники.
- **Дизайн-решения** согласуй с `design/README.md`, `DESIGN_IMPLEMENTATION.md` и `ADVANCED_DESIGN_EFFECTS.md`.

## Definition of Done для PR

Прежде чем отметить PR готовым к ревью, убедись:

- [ ] `npm run lint` проходит без ошибок.
- [ ] `npm run build` собирается.
- [ ] Миграции применимы к PostgreSQL.
- [ ] Если менялись Payload-коллекции — сгенерированы типы и import map.
- [ ] UI соответствует вайбу продукта: тёплые тона, спокойный UX, контент-first.
- [ ] В коде нет секретов, ключей и токенов.

## Сообщения коммитов

Предпочтительный префикс:

- `feat:` — новая функциональность
- `fix:` — исправление бага
- `docs:` — документация
- `style:` — форматирование, CSS
- `refactor:` — рефакторинг без изменения поведения
- `chore:` — сборка, зависимости, скрипты

## Если сомневаешься

Сначала обсуди в issue. Лучше задать вопрос до изменений, чем откатывать большой diff.

---

Спасибо, что помогаешь делать CoffeeMan уютнее ☕

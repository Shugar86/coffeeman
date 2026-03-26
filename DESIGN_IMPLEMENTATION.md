# Design Implementation Guide

## Pixso Design to Next.js

Этот документ описывает процесс внедрения дизайна из Pixso в Next.js проект CoffeeMan.

## Структура проекта

### CSS переменные и тема

Все цвета и переменные дизайна хранятся в файле `src/styles/design-system.css`.

**Основные переменные:**
- `--primary-beige`: #f5f1e8 (основной бежевый цвет)
- `--primary-maroon`: #8B1538 (основной бордовый - акцент)
- `--primary-marsala`: rgb(139, 21, 56)
- `--base`: #f8f6f3 (фоновый цвет)
- `--text-dark`: rgb(0, 0, 0)
- `--text-gray`: #999

### Компоненты

**HomePage.tsx** - Главная страница с применением дизайна:
- Hero Section с HeroSlider
- Featured Products Grid (4 продукта)
- About Section с информацией о CoffeeMan
- Header и Footer

## Использование в компонентах

### Способ 1: CSS переменные

```tsx
<div style={{ backgroundColor: 'var(--primary-beige)' }}>
  Content
</div>
```

### Способ 2: Tailwind классы

```tsx
<div className="bg-primary-light text-primary-maroon">
  Content
</div>
```

*Требует добавления переменных в tailwind.config.ts*

## Как добавить новые компоненты

1. Создай новый компонент в папке `src/components/site/`
2. Импортируй стили: `import '../../../styles/design-system.css'`
3. Используй CSS переменные через `style={{}}` или Tailwind классы
4. Убедись, что компонент использует цвета из дизайн-системы

## Экспорт из Pixso

Используемые компоненты из Pixso:
- Main page - основная страница
- Catalog - каталог товаров
- Product cards - карточки товаров
- Header - навигация
- Footer - подвал

## Палитра цветов

| Название | Код | Использование |
|----------|-----|----------------|
| Primary Beige | #f5f1e8 | Фоны, секции |
| Primary Maroon | #8B1538 | Кнопки, заголовки, акценты |
| Base | #f8f6f3 | Альтернативные фоны |
| Text Dark | rgb(0, 0, 0) | Основной текст |
| Text Gray | #999 | Вторичный текст |

## Адаптивность

Все компоненты используют Tailwind классы для адаптивности:
- `md:` - для планшетов
- `lg:` - для десктопов

Пример:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

## Ссылки

- Pixso Design: https://pixso.net/app/design/vagqPse1QwjSHIlBWIULzg
- Repository: https://github.com/Shugar86/coffeeman

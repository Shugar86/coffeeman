# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added
- Vibe-first документация: README, AGENTS, LICENSE, CONTRIBUTING, CHANGELOG.

### Changed
- Доведена документация до 10/10: единые заголовки, badges, структура, примеры, DoD.

## [0.1.0] — 2026-03-26

### Added
- Первоначальная версия CoffeeMan: Next.js 15 + Payload CMS 3 + PostgreSQL.
- Витрина товаров с каталогом, фильтрами и карточками.
- Корзина и оформление заказа (Zod + Zustand).
- Админка Payload для товаров, заказов, статей, кофеен, категорий и настроек.
- Карта кофеен на Яндекс.Картах.
- Блог со статьями и галереей.
- Docker-окружение для разработки и продакшена.
- Дизайн-система из Pixso: цвета, типографика, компоненты, hover-эффекты.
- Компоненты UI: `CoffeeCard`, `TornPaperBackground`, `TapedPhoto`, `PolaroidFrame`, `Button`, `Chip` и другие.
- Скрипт резервного копирования базы данных.
- Скрипт проверки схемы загрузок товаров.

### Changed
- Главная страница сверстана по макетам Pixso.
- Удалён неиспользуемый `HomePage.tsx` с broken default imports для разблокировки Docker-сборки.

### Fixed
- Исправлены default imports, мешавшие production-сборке.

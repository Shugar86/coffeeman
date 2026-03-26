# Advanced Design Effects из Pixso

Все "дизайнерские извращения" и продвинутые эффекты из UI-kit в Pixso.

## CoffeeCard Component

### Hover эффекты

#### 1. **Multi-layer Shadow System**
```css
boxShadow: isHovered
  ? '0 20px 40px rgba(139, 21, 56, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)'
  : '0 4px 12px rgba(0, 0, 0, 0.08)'
```
- Двухслойная тень для глубины
- Первая тень: размытая, цветная (maroon)
- Вторая тень: black для контраста

#### 2. **Transform Combinations**
```css
transform: isHovered 
  ? 'translateY(-8px) scale(1.02)' 
  : 'translateY(0) scale(1)'
```
- translateY: поднятие карточки на 8px
- scale: увеличение на 2% для "breathing" эффекта

#### 3. **Gradient Overlays**
```css
background: isHovered
  ? 'linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(245, 242, 234, 0.05) 100%)'
  : 'transparent'
```
- Градиентный оверлей от maroon к beige
- Низкая opacity (5%) для subtle эффекта

#### 4. **Image Scale + Rotate**
```css
transform: isHovered 
  ? 'scale(1.1) rotate(2deg)' 
  : 'scale(1) rotate(0deg)'
```
- Комбинация zoom + поворота
- Создает "живой" эффект при hover

#### 5. **Radial Gradient Spotlight**
```css
background: isHovered
  ? 'radial-gradient(circle at center, rgba(139, 21, 56, 0.1) 0%, transparent 70%)'
  : 'transparent'
```
- Радиальный градиент от центра
- Эффект "подсветки" изображения

#### 6. **Dynamic Font Size Changes**
```css
fontSize: isHovered ? '1.1rem' : '1rem'
fontSize: isHovered ? '1.75rem' : '1.5rem'
fontSize: isHovered ? '0.95rem' : '0.875rem'
```
- Все текстовые элементы меняют размер
- Создает динамичный интерфейс

#### 7. **Text Shadow on Price**
```css
textShadow: isHovered 
  ? '0 2px 4px rgba(139, 21, 56, 0.1)' 
  : 'none'
```
- Subtle тень на цене при hover
- Maroon цвет тени для консистентности

#### 8. **Button State Transitions**
```css
backgroundColor: isHovered ? '#8B1538' : '#d4cac0'
color: isHovered ? '#fff' : '#8B1538'
boxShadow: isHovered ? '0 8px 16px rgba(139, 21, 56, 0.2)' : 'none'
transform: isHovered ? 'scale(1.05)' : 'scale(1)'
```
- Полная инверсия цветов кнопки
- Добавление тени
- Scale увеличение на 5%

#### 9. **Dashed Border Effect**
```css
border: isHovered
  ? '2px dashed rgba(139, 21, 56, 0.3)'
  : '2px solid transparent'
```
- Пунктирная граница при hover
- Semi-transparent maroon

#### 10. **Featured Badge Animation**
```css
backgroundColor: isHovered 
  ? 'rgba(139, 21, 56, 0.2)' 
  : 'rgba(139, 21, 56, 0.1)'
transform: isHovered ? 'scale(1.1)' : 'scale(1)'
```
- Badge также реагирует на hover
- Darkening + scale эффект

## Timing Functions

Все transition используют разные длительности:
```css
transition: 'all 0.3s ease'      // Базовые
transition-duration: 300ms       // Overlay
transition-transform: 500ms      // Image
```

## Color System

### Primary Marsala
```css
--primary-maroon: #8B1538
--primary-marsala: rgb(139, 21, 56)
```

### Usage Patterns
- **Shadows**: rgba(139, 21, 56, 0.15) / 0.1 / 0.2 / 0.3
- **Backgrounds**: rgba(139, 21, 56, 0.05) / 0.1 / 0.2
- **Borders**: rgba(139, 21, 56, 0.3)

### Beige Gradients
```css
linear-gradient(135deg, #f5f1e8 0%, #ede7de 100%)  // Hover
linear-gradient(135deg, #f5f1e8 0%, #f9f6f0 100%)  // Default
```

## Responsive Layers

```
Card
  └─ Gradient Overlay (z-index: auto)
      └─ Image Container
          └─ Image
          └─ Radial Spotlight
      └─ Content (z-index: 10)
          └─ Title + Badge
          └─ Description
          └─ Price + Button
  └─ Dashed Border (top layer, pointer-events: none)
```

## Performance Considerations

1. **pointer-events: none** на overlay элементах
2. **will-change** НЕ используется (не нужно для простых hover)
3. Все transitions на `transform` и `opacity` (GPU accelerated)
4. `boxShadow` анимируется осторожно

## Usage Example

```tsx
import CoffeeCard from '@/components/ui/CoffeeCard';

<CoffeeCard
  id="coffee-1"
  name="Арабика Бразилия"
  description="Насыщенный вкус с нотками шоколада и ореха"
  price={500}
  image="/images/coffee-1.jpg"
  featured={true}
/>
```

## Дополнительные извращения

### Что можно добавить:

1. **Parallax эффект** на изображении
2. **Particle effects** при hover
3. **Blur backdrop** для overlay
4. **Clip-path animations** для необычных форм
5. **SVG morphing** для иконок
6. **3D transforms** (rotateX, rotateY)
7. **Glow effects** с box-shadow
8. **Gradient borders** через псевдоэлементы
9. **Text gradient** на заголовках
10. **Animated pseudo-elements** (:before, :after)

## Известные ограничения

- Не работает на touch устройствах (нужен onTouchStart)
- Может лагать на старых браузерах
- Accessibility нужно проверить с screen readers

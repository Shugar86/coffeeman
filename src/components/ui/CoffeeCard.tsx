'use client';

import { useState } from 'react';

interface CoffeeCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  featured?: boolean;
}

export default function CoffeeCard({
  id,
  name,
  description,
  price,
  image,
  featured = false,
}: CoffeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#fff',
        // Теня до наведения
        boxShadow: isHovered
          ? '0 20px 40px rgba(139, 21, 56, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Градиентные оверлей */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(245, 242, 234, 0.05) 100%)'
            : 'transparent',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Изображение */}
      <div
        className="relative w-full h-64 bg-gradient-to-br overflow-hidden"
        style={{
          backgroundColor: '#f5f1e8',
          background: isHovered
            ? 'linear-gradient(135deg, #f5f1e8 0%, #ede7de 100%)'
            : 'linear-gradient(135deg, #f5f1e8 0%, #f9f6f0 100%)',
          transition: 'all 0.3s ease',
        }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-lg font-bold transition-all duration-300"
            style={{
              color: isHovered ? '#8B1538' : '#999',
              fontSize: isHovered ? '1.25rem' : '1rem',
            }}
          >
            {name}
          </div>
        )}

        {/* Оверлей с градиентом при наведении */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isHovered
              ? 'radial-gradient(circle at center, rgba(139, 21, 56, 0.1) 0%, transparent 70%)'
              : 'transparent',
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* Контент */}
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-lg font-semibold transition-all duration-300"
            style={{
              color: isHovered ? '#8B1538' : '#000',
              fontSize: isHovered ? '1.1rem' : '1rem',
            }}
          >
            {name}
          </h3>
          {featured && (
            <span
              className="px-2 py-1 text-xs font-bold rounded transition-all duration-300"
              style={{
                backgroundColor: isHovered ? 'rgba(139, 21, 56, 0.2)' : 'rgba(139, 21, 56, 0.1)',
                color: '#8B1538',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              ТОП
            </span>
          )}
        </div>

        <p
          className="text-sm mb-4 transition-all duration-300 line-clamp-2"
          style={{
            color: isHovered ? '#666' : '#999',
            fontSize: isHovered ? '0.95rem' : '0.875rem',
          }}
        >
          {description}
        </p>

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-2xl font-bold transition-all duration-300"
            style={{
              color: '#8B1538',
              fontSize: isHovered ? '1.75rem' : '1.5rem',
              textShadow: isHovered ? '0 2px 4px rgba(139, 21, 56, 0.1)' : 'none',
            }}
          >
            от {price}₽
          </span>

          <button
            className="px-6 py-2 rounded font-semibold transition-all duration-300 transform"
            style={{
              backgroundColor: isHovered ? '#8B1538' : '#d4cac0',
              color: isHovered ? '#fff' : '#8B1538',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isHovered
                ? '0 8px 16px rgba(139, 21, 56, 0.2)'
                : 'none',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              fontSize: isHovered ? '0.95rem' : '0.875rem',
              fontWeight: isHovered ? 600 : 500,
            }}
          >
            В корзину
          </button>
        </div>
      </div>

      {/* Пунктирная тень при hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          border: isHovered
            ? '2px dashed rgba(139, 21, 56, 0.3)'
            : '2px solid transparent',
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}

'use client';

import React from 'react';

interface TapedPhotoProps {
  src: string;
  alt: string;
  rotation?: number; // Угол наклона в градусах
  tapeColor?: string;
  className?: string;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
}

export default function TapedPhoto({
  src,
  alt,
  rotation = -5,
  tapeColor = 'rgba(255, 255, 200, 0.7)',
  className = '',
  shadowIntensity = 'medium',
}: TapedPhotoProps) {
  const shadows = {
    light: '0 4px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 10px 20px rgba(0, 0, 0, 0.15)',
    heavy: '0 15px 30px rgba(0, 0, 0, 0.25)',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Скотч сверху */}
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          width: '80px',
          height: '30px',
          backgroundColor: tapeColor,
          borderRadius: '2px',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
          opacity: 0.8,
        }}
      >
        {/* Текстура скотча */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.02) 2px,
                rgba(0, 0, 0, 0.02) 4px
              )
            `,
          }}
        />
      </div>

      {/* Фотография */}
      <div
        className="relative bg-white p-3 group hover:scale-105 transition-transform duration-300"
        style={{
          boxShadow: shadows[shadowIntensity],
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          style={{
            filter: 'sepia(0.1) contrast(1.1)',
          }}
        />

        {/* Белая рамка как у поляроида */}
        <div className="absolute inset-0 border-8 border-white pointer-events-none" />

        {/* Тень от скотча */}
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-black opacity-5 blur-sm"
        />
      </div>

      {/* Дополнительный кусок скотча сбоку (опционально) */}
      {Math.abs(rotation) > 3 && (
        <div
          className="absolute -bottom-2 right-4 z-20"
          style={{
            width: '40px',
            height: '25px',
            backgroundColor: tapeColor,
            borderRadius: '2px',
            transform: 'rotate(15deg)',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
            opacity: 0.7,
          }}
        />
      )}
    </div>
  );
}

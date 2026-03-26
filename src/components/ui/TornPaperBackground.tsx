'use client';

import React from 'react';

interface TornPaperBackgroundProps {
  className?: string;
  color?: 'maroon' | 'beige' | 'custom';
  customColor?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
}

export default function TornPaperBackground({
  className = '',
  color = 'maroon',
  customColor,
  side = 'left',
  children,
}: TornPaperBackgroundProps) {
  const colors = {
    maroon: '#8B1538',
    beige: '#f5f1e8',
    custom: customColor || '#8B1538',
  };

  const bgColor = colors[color];

  // SVG path для рваного края
  const tornEdgePath = {
    left: 'M0,0 L100,0 L100,10 Q95,15 90,10 L90,20 Q85,25 80,20 L80,30 Q75,35 70,30 L70,40 Q65,45 60,40 L60,50 Q55,55 50,50 L50,60 Q45,65 40,60 L40,70 Q35,75 30,70 L30,80 Q25,85 20,80 L20,90 Q15,95 10,90 L10,100 L0,100 Z',
    right: 'M0,0 L100,0 L100,100 L90,100 Q85,95 90,90 L90,80 Q85,75 90,70 L90,60 Q85,55 90,50 L90,40 Q85,35 90,30 L90,20 Q85,15 90,10 L90,0 L0,0 Z',
    top: 'M0,0 L10,0 Q15,5 10,10 L20,10 Q25,15 20,20 L30,20 Q35,25 30,30 L40,30 Q45,35 40,40 L50,40 Q55,45 50,50 L60,50 Q65,55 60,60 L70,60 Q75,65 70,70 L80,70 Q85,75 80,80 L90,80 Q95,85 90,90 L100,90 L100,100 L0,100 Z',
    bottom: 'M0,0 L100,0 L100,90 Q95,85 90,90 L80,90 Q75,85 80,80 L70,80 Q65,75 70,70 L60,70 Q55,65 60,60 L50,60 Q45,55 50,50 L40,50 Q35,45 40,40 L30,40 Q25,35 30,30 L20,30 Q15,25 20,20 L10,20 Q5,15 10,10 L0,10 Z',
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {/* Рваный край через SVG */}
      <svg
        className="absolute"
        style={{
          [side === 'left' || side === 'right' ? 'height' : 'width']: '100%',
          [side === 'left' || side === 'right' ? 'width' : 'height']: '20px',
          [side]: 0,
          ...(side === 'top' || side === 'bottom' ? { left: 0 } : { top: 0 }),
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d={tornEdgePath[side]} fill={bgColor} />
      </svg>

      {/* Текстура бумаги */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px
            )
          `,
        }}
      />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

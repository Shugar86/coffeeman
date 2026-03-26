'use client'

import Image from 'next/image'

interface TapedImageProps {
  src: string
  alt: string
  rotation?: number
  tapeColor?: string
  tapePosition?: 'top' | 'top-left' | 'top-right'
  className?: string
}

/**
 * Изображение с эффектом "приклеенного скотча" как в скрапбуке
 */
export function TapedImage({
  src,
  alt,
  rotation = -3,
  tapeColor = 'rgba(255, 200, 180, 0.7)',
  tapePosition = 'top',
  className = '',
}: TapedImageProps) {
  const tapePositions = {
    top: 'left-1/2 -top-3 -translate-x-1/2 rotate-1',
    'top-left': 'left-4 -top-3 -rotate-2',
    'top-right': 'right-4 -top-3 rotate-2',
  }

  return (
    <div
      className={`relative inline-block transition-transform hover:scale-[1.02] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Скотч сверху */}
      <div
        className={`absolute z-20 h-8 w-20 ${tapePositions[tapePosition]}`}
        style={{
          backgroundColor: tapeColor,
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
          opacity: 0.85,
        }}
      />

      {/* Рамка и фото */}
      <div className="relative overflow-hidden rounded-lg bg-white p-2 shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden rounded">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useRef } from 'react';
import { useStickers } from '../context/StickerContext';

interface StickerProps {
  id: string;
  src?: string;
  alt: string;
  className?: string;
  rotation?: number;
  scale?: number;
  width?: string;
  offsetX?: string;
  offsetY?: string;
  draggable?: boolean;
  customElement?: React.ReactNode; 
  onDragEnd?: (event: any, info: any) => void;
  onSelect?: () => void;
  isSelected?: boolean;
  isMoveMode?: boolean;
  style?: React.CSSProperties;
  onScaleChange?: (scale: number) => void;
  onRotateChange?: (rotate: number) => void;
  onResetImage?: () => void;
  onUploadImage?: (base64: string) => void;
  layer?: 'front' | 'middle' | 'back';
  onLayerChange?: (layer: 'front' | 'middle' | 'back') => void;
}

export default function Sticker({
  id,
  src,
  alt,
  className = '',
  rotation = 0,
  scale = 1.0,
  width = 'w-24',
  offsetX = '0px',
  offsetY = '0px',
  draggable = false,
  customElement,
  onDragEnd,
  onSelect,
  isSelected = false,
  isMoveMode = false,
  style = {},
  onScaleChange,
  onRotateChange,
  onResetImage,
  onUploadImage,
  layer = 'front',
  onLayerChange
}: StickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile, isTablet } = useStickers();
  const currentDeviceKey = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  // High-performance image scaling and transparency retention
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64Str = event.target?.result as string;
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Ideal size for sticker - high-def on screen, extremely small base64 signature
        const MAX_HEIGHT = 400;
        let w = img.width;
        let h = img.height;

        if (w > h) {
          if (w > MAX_WIDTH) {
            h = Math.round((h * MAX_WIDTH) / w);
            w = MAX_WIDTH;
          }
        } else {
          if (h > MAX_HEIGHT) {
            w = Math.round((w * MAX_HEIGHT) / h);
            h = MAX_HEIGHT;
          }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, w, h); // Preserves alpha transparency
          ctx.drawImage(img, 0, 0, w, h);
          const compressedBase64 = canvas.toDataURL('image/png'); // Maintains perfect transparency, no background box
          if (onUploadImage) {
            onUploadImage(compressedBase64);
          }
        } else {
          if (onUploadImage) {
            onUploadImage(base64Str);
          }
        }
      };
    };
    e.target.value = ''; // Reset file input value to allow successive uploads of the same file
  };

  return (
    <motion.div
      key={`${id}-${currentDeviceKey}`}
      drag={draggable}
      dragConstraints={false}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: scale * 1.1, rotate: rotation + 5, zIndex: 100 }}
      whileHover={{ 
        scale: isMoveMode ? scale * 1.03 : scale * 1.06, 
        rotate: isMoveMode ? rotation : (rotation > 0 ? rotation - 2 : rotation + 2),
        transition: { type: 'spring', stiffness: 400, damping: 15 }
      }}
      onTap={() => {
        if (isMoveMode && onSelect) {
          onSelect();
        }
      }}
      style={{
        left: offsetX,
        top: offsetY,
        filter: isMoveMode 
          ? isSelected
            ? 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.6))'
            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))'
          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
        ...style
      }}
      className={`absolute z-30 select-none ${className} ${
        isMoveMode 
          ? isSelected 
            ? 'cursor-move ring-2 ring-dashed ring-rose-500/80 rounded p-1.5'
            : 'cursor-move hover:ring-1 hover:ring-dashed hover:ring-rose-400/50 rounded p-1.5' 
          : 'cursor-grab active:cursor-grabbing p-0'
      } transition-all duration-200`}
    >
      {/* Hidden file input native selector */}
      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Embedded Actions Popover Float (direct control right above the sticker) */}
      {isMoveMode && isSelected && (
        <div 
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-white rounded-md px-2 py-1 flex items-center gap-1.5 z-55 shadow-xl pointer-events-auto"
          onPointerDown={(e) => e.stopPropagation()} // Stop drag interaction when clicking menu
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[9px] font-mono whitespace-nowrap font-bold text-zinc-400 border-r border-zinc-800 pr-1 px-1">
            STICKER MENU
          </span>

          {/* Trigger direct programatic click */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="text-[10px] bg-sky-500 hover:bg-sky-600 text-white px-2 py-0.5 rounded font-black font-mono transition-all active:scale-95 cursor-pointer leading-tight"
          >
            📷 REPLACE
          </button>

          {/* Scale decrement */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onScaleChange) onScaleChange(Math.max(0.4, scale - 0.15));
            }}
            className="text-[10px] hover:bg-zinc-800 text-white bg-zinc-950 border border-zinc-800/80 w-5 h-5 flex items-center justify-center rounded font-bold cursor-pointer"
            title="Shrink"
          >
            -
          </button>

          {/* Scale increment */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onScaleChange) onScaleChange(Math.min(2.5, scale + 0.15));
            }}
            className="text-[10px] hover:bg-zinc-800 text-white bg-zinc-950 border border-zinc-800/80 w-5 h-5 flex items-center justify-center rounded font-bold cursor-pointer"
            title="Enlarge"
          >
            +
          </button>

          {/* Rotate Left */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onRotateChange) onRotateChange(rotation - 15);
            }}
            className="text-[9px] hover:bg-zinc-800 text-zinc-300 font-bold bg-zinc-950 border border-zinc-800/80 px-1 py-0.5 rounded cursor-pointer leading-none"
            title="Rotate Left"
          >
            ⟲ 15°
          </button>

          {/* Rotate Right */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onRotateChange) onRotateChange(rotation + 15);
            }}
            className="text-[9px] hover:bg-zinc-800 text-zinc-300 font-bold bg-zinc-950 border border-zinc-800/80 px-1 py-0.5 rounded cursor-pointer leading-none"
            title="Rotate Right"
          >
            ⟳ 15°
          </button>

          {/* Reset original illustration sticker */}
          {onResetImage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onResetImage();
              }}
              className="text-[9px] bg-amber-500 hover:bg-amber-600 text-black px-1.5 py-0.5 rounded font-bold font-mono transition-all active:scale-95 cursor-pointer leading-tight"
              title="Reset Image back to illustrations"
            >
              ♻️ REVERT
            </button>
          )}

          {/* Quick layer depth cycle button */}
          {onLayerChange && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const layersList: ('front' | 'middle' | 'back')[] = ['front', 'middle', 'back'];
                const nextLayer = layersList[(layersList.indexOf(layer) + 1) % layersList.length];
                onLayerChange(nextLayer);
              }}
              className="text-[9px] bg-zinc-950 hover:bg-zinc-800 text-teal-400 font-bold px-1.5 py-0.5 rounded font-mono transition-all active:scale-95 cursor-pointer leading-tight border border-zinc-800"
              title="Cycle Layer Level: Front / Behind Sticky Note / Behind Everything"
            >
              🥞 {layer === 'front' ? 'FRONT' : layer === 'middle' ? 'MID' : 'BACK'}
            </button>
          )}
        </div>
      )}

      {/* Main visual body (Pure transparent layers, no bounding square white boxes) */}
      <div className="relative group flex items-center justify-center rounded overflow-visible bg-transparent">
        {customElement ? (
          <div className="pointer-events-none select-none bg-transparent">
            {customElement}
          </div>
        ) : src ? (
          <img
            src={src}
            alt={alt}
            className={`${width} object-contain block pointer-events-none select-none max-w-none bg-transparent`}
            style={{ 
              maxWidth: '220px', 
              imageRendering: 'auto',
              // Extra guarantee that there is absolutely no background container showing up
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 bg-rose-500 rounded-full" />
        )}
      </div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ASSETS } from '../data';
import Sticker from './Sticker';
import { useStickers } from '../context/StickerContext';

export default function IndexCard() {
  const {
    isMoveMode,
    selectedSticker,
    stickers,
    customImages,
    setCustomImages,
    handleDragEnd,
    handleUpdateStickerSetting,
    setSelectedSticker,
    isMobile,
    isTablet
  } = useStickers();

  // Weathered ink-stamp component drawn dynamically with SVG
  const RubberStamp = () => (
    <div className="absolute right-6 top-6 w-20 h-20 border-4 border-dashed border-sky-800/60 rounded-full flex items-center justify-center rotate-[15deg] opacity-75 select-none pointer-events-none">
      <div className="text-center text-sky-800/80 font-mono text-[9px] font-bold leading-none uppercase">
        <div className="border-b border-sky-800/60 pb-0.5 mb-0.5 font-black">APPROVED</div>
        <div className="text-[12px] tracking-widest font-black text-rose-600">D.ST</div>
        <div className="border-t border-sky-800/60 pt-0.5 mt-0.5 font-black text-[8px]">CLASSIFIED</div>
      </div>
    </div>
  );

  // Retro stylized comic sticker: "DEAD INSIDE" with hand-inked stamp style
  const JaggedDeadInside = () => (
    <div className="w-20 h-20 rounded-full border-4 border-double border-red-600 flex flex-col items-center justify-center rotate-[-8deg] shrink-0 select-none p-1 bg-[#fff8f8]">
      <div className="text-center font-display leading-none text-red-600">
        <div className="text-[7px] font-mono font-black tracking-widest text-[#bf5b00]">WARNING</div>
        <div className="text-sm font-black tracking-wider leading-none mt-0.5">DEAD</div>
        <div className="text-sm font-black tracking-wider leading-none">INSIDE</div>
        <div className="text-[6px] font-mono mt-0.5 font-semibold text-stone-500">SECTOR / 9</div>
      </div>
    </div>
  );

  // Orange soda can cartoon character with limbs
  const OrangeCanCartoon = () => (
    <div className="flex flex-col items-center justify-center select-none">
      <svg width="80" height="96" viewBox="0 0 84 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none">
        {/* Left Leg walking */}
        <path d="M28 72 C28 85, 20 85, 14 88" stroke="black" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 84 C8 87, 3 89, 6 93 C10 95, 18 93, 19 87" fill="#3b82f6" stroke="black" strokeWidth="2.5" />
        
        {/* Right Leg walking */}
        <path d="M52 72 C52 85, 62 85, 68 88" stroke="black" strokeWidth="4" strokeLinecap="round" />
        <path d="M66 84 C68 87, 73 89, 70 93 C66 95, 58 93, 57 87" fill="#3b82f6" stroke="black" strokeWidth="2.5" />

        {/* Can body */}
        <rect x="20" y="16" width="44" height="56" rx="22" fill="#f97316" stroke="black" strokeWidth="4" />
        
        {/* Can Top Rim */}
        <path d="M24 16 C24 10, 60 10, 60 16" stroke="black" strokeWidth="4" strokeLinecap="round" fill="#e5e7eb" />
        
        {/* Googly Eyes */}
        <circle cx="34" cy="38" r="11" fill="white" stroke="black" strokeWidth="3" />
        <circle cx="50" cy="38" r="11" fill="white" stroke="black" strokeWidth="3" />
        <circle cx="32" cy="38" r="4" fill="black" />
        <circle cx="48" cy="38" r="4" fill="black" />
        
        {/* Smile & Fangs */}
        <path d="M31 53 Q42 61 53 53" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M34 54 L36 57 L38 54 Z" fill="white" stroke="black" strokeWidth="1.5" />
        <path d="M46 54 L48 57 L50 54 Z" fill="white" stroke="black" strokeWidth="1.5" />

        {/* Left hand waving */}
        <path d="M18 45 Q8 40 12 30" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="28" r="4.5" fill="black" />

        {/* Right hand */}
        <path d="M66 45 Q74 48 70 56" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="70" cy="58" r="4.5" fill="black" />
      </svg>
      <div className="font-mono text-[7px] text-zinc-400 mt-1 uppercase tracking-wider font-extrabold">CAN-BYTE #01</div>
    </div>
  );

  // Creative Pencil Coiled spiral loops sticker
  const CreativeSpiralPencil = () => (
    <div className="flex flex-col items-center justify-center select-none">
      <svg width="80" height="96" viewBox="0 0 84 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none">
        <g stroke="black" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Black shadow outline curve */}
          <path d="M 60 14 C 40 12, 12 20, 12 40 C 12 60, 48 68, 52 46 C 55 24, 20 28, 22 56 C 24 74, 52 82, 64 78" stroke="black" strokeWidth="8" strokeLinecap="round" fill="none" />
          
          {/* Core yellow lead pencil */}
          <path d="M 60 14 C 40 12, 12 20, 12 40 C 12 60, 48 68, 52 46 C 55 24, 20 28, 22 56 C 24 74, 52 82, 64 78" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />
          
          {/* Alternating black comic stripes */}
          <path d="M 38 13.5 Q 32 15 24 20" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 12.5 45 Q 16 54 24 58" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 47 43 Q 39 30 26 34" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 32 68 Q 44 76 56 79" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Pink Eraser strip */}
          <rect x="58" y="8" width="5" height="10" rx="1.5" transform="rotate(-15 60 14)" fill="#f472b6" stroke="black" strokeWidth="1.5" />
          <rect x="56" y="11" width="3" height="10" rx="0.5" transform="rotate(-15 60 14)" fill="#a1a1aa" stroke="black" strokeWidth="1" />

          {/* Sharpened point tip */}
          <path d="M 64 78 L 74 81 L 67 71 Z" fill="#ffedd5" stroke="black" strokeWidth="1.5" />
          <path d="M 71 80 L 74 81 L 72 77 Z" fill="black" />
        </g>
      </svg>
      <div className="font-mono text-[7px] text-zinc-400 mt-1 uppercase tracking-wider font-extrabold">COIL-PENCIL</div>
    </div>
  );

  // Red ghost character sticker with cute angry eyes
  const HandBuiltGhost = () => (
    <div className="bg-rose-500 border-2 border-black rounded-t-full w-14 h-16 relative flex flex-col justify-between p-1.5 shadow-md">
      {/* Ghost Eyes */}
      <div className="flex justify-around px-1 mt-1 select-none">
        <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-start p-0.5 border border-black">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
        </div>
        <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-start p-0.5 border border-black">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
        </div>
      </div>
      {/* Mouth */}
      <div className="w-2.5 h-1.5 bg-stone-900 rounded-full self-center mb-1" />
      {/* Bottom waves wobbly curves */}
      <div className="absolute -bottom-1.5 left-0 right-0 h-4 flex overflow-hidden">
        <div className="w-3.5 h-4 bg-rose-500 rounded-full shrink-0 border-b-2 border-r border-black" />
        <div className="w-3.5 h-4 bg-rose-500 rounded-full shrink-0 border-b-2 border-x border-black" />
        <div className="w-3.5 h-4 bg-rose-500 rounded-full shrink-0 border-b-2 border-x border-black" />
        <div className="w-3.5 h-4 bg-rose-500 rounded-full shrink-0 border-b-2 border-l border-black" />
      </div>
    </div>
  );

  // Hand-built green zombie bone joint sticker
  const HandBuiltZombieArm = () => (
    <div className="flex flex-col items-center select-none rotate-[8deg]">
      <svg width="44" height="60" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="21" y="48" width="6" height="12" rx="3" fill="#ffffff" stroke="black" strokeWidth="2.5" />
        <path d="M12 40 L36 40 L32 48 L16 48 Z" fill="#22c55e" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="24" cy="48" rx="8" ry="2" fill="#ef4444" stroke="black" strokeWidth="1.5" />
        <path d="M10 24 Q10 16 14 16 Q18 16 18 24 L18 36 L12 36 Z" fill="#15803d" stroke="black" strokeWidth="2" />
        <path d="M18 18 Q18 10 22 10 Q26 10 26 18 L26 36 L18 36 Z" fill="#22c55e" stroke="black" strokeWidth="2" />
        <path d="M26 21 Q26 13 30 13 Q34 13 34 21 L34 36 L26 36 Z" fill="#22c55e" stroke="black" strokeWidth="2" />
        <path d="M34 28 Q42 26 40 32 Q38 35 34 35 Z" fill="#166534" stroke="black" strokeWidth="2" />
        <rect x="21" y="11" width="2" height="3" fill="black" />
        <rect x="29" y="14" width="2" height="3" fill="black" />
      </svg>
    </div>
  );

  const getZIndexClass = (layer?: 'front' | 'middle' | 'back') => {
    if (layer === 'back') return 'z-[5]';
    if (layer === 'middle') return 'z-[15]';
    return 'z-30'; // default is 'front'
  };

  const getCoords = (stickerState: any) => {
    if (!stickerState) return { x: 0, y: 0 };
    if (isMobile) {
      return {
        x: stickerState.mobileX !== undefined ? stickerState.mobileX : stickerState.x,
        y: stickerState.mobileY !== undefined ? stickerState.mobileY : stickerState.y,
      };
    }
    if (isTablet) {
      return {
        x: stickerState.tabletX !== undefined ? stickerState.tabletX : stickerState.x,
        y: stickerState.tabletY !== undefined ? stickerState.tabletY : stickerState.y,
      };
    }
    return {
      x: stickerState.x,
      y: stickerState.y,
    };
  };

  const getScale = (stickerState: any, defaultVal: number = 1.0) => {
    if (!stickerState) return defaultVal;
    if (isMobile) {
      return stickerState.mobileScale !== undefined ? stickerState.mobileScale : (stickerState.scale ?? defaultVal);
    }
    if (isTablet) {
      return stickerState.tabletScale !== undefined ? stickerState.tabletScale : (stickerState.scale ?? defaultVal);
    }
    return stickerState.scale ?? defaultVal;
  };

  const getRotate = (stickerState: any, defaultVal: number = 0) => {
    if (!stickerState) return defaultVal;
    if (isMobile) {
      return stickerState.mobileRotate !== undefined ? stickerState.mobileRotate : (stickerState.rotate ?? defaultVal);
    }
    if (isTablet) {
      return stickerState.tabletRotate !== undefined ? stickerState.tabletRotate : (stickerState.rotate ?? defaultVal);
    }
    return stickerState.rotate ?? defaultVal;
  };

  return (
    <div className="flex flex-col items-center mt-6 sm:mt-10 md:mt-14">
      <section className="relative w-full max-w-5xl mx-auto px-4 pt-16 pb-36 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 overflow-visible">
        
        {/* --- ALL STICKERS RENDERING AS DECOUPLED INDEPENDENT FLOATING PEERS --- */}

        {/* 1. Green Alien Head Sticker */}
        <div className={`absolute top-[20px] left-[20px] md:top-[15px] md:left-1/2 md:-ml-[322px] select-none ${getZIndexClass(stickers.alien?.layer)}`}>
          <Sticker
            id="alien"
            src={customImages.alien || ASSETS.stickerAlien}
            alt="Green Alien Head Sticker"
            rotation={getRotate(stickers.alien, -12)}
            scale={getScale(stickers.alien, 1.0)}
            width="w-14"
            offsetX="0px"
            offsetY="0px"
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('alien', e, info)}
            onSelect={() => setSelectedSticker('alien')}
            isSelected={selectedSticker === 'alien'}
            style={{
              ...getCoords(stickers.alien),
              rotate: getRotate(stickers.alien, -12),
              scale: getScale(stickers.alien, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.alien?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('alien', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('alien', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('alien', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, alien: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, alien: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 2. Creative Spiral Pencil Sticker */}
        <div className={`absolute top-[10px] right-[-25px] left-auto md:top-[5px] md:left-1/2 md:-ml-[92px] md:right-auto select-none ${getZIndexClass(stickers.pencil?.layer)}`}>
          <Sticker
            id="pencil"
            src={customImages.pencil || undefined}
            alt="Coil Pencil Sticker"
            rotation={getRotate(stickers.pencil, 15)}
            scale={getScale(stickers.pencil, 1.0)}
            offsetX="0px"
            offsetY="0px"
            customElement={customImages.pencil ? undefined : <CreativeSpiralPencil />}
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('pencil', e, info)}
            onSelect={() => setSelectedSticker('pencil')}
            isSelected={selectedSticker === 'pencil'}
            style={{
              ...getCoords(stickers.pencil),
              rotate: getRotate(stickers.pencil, 15),
              scale: getScale(stickers.pencil, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.pencil?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('pencil', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('pencil', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('pencil', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, pencil: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, pencil: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 3. Soda Can Walking Sticker */}
        <div className={`absolute top-[290px] left-[15px] md:top-[290px] md:left-1/2 md:-ml-[382px] select-none ${getZIndexClass(stickers.can?.layer)}`}>
          <Sticker
            id="can"
            src={customImages.can || undefined}
            alt="Soda Can Walking Sticker"
            rotation={getRotate(stickers.can, -18)}
            scale={getScale(stickers.can, 1.0)}
            offsetX="0px"
            offsetY="0px"
            customElement={customImages.can ? undefined : <OrangeCanCartoon />}
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('can', e, info)}
            onSelect={() => setSelectedSticker('can')}
            isSelected={selectedSticker === 'can'}
            style={{
              ...getCoords(stickers.can),
              rotate: getRotate(stickers.can, -18),
              scale: getScale(stickers.can, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.can?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('can', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('can', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('can', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, can: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, can: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 4. Classic Red Monster Ghost */}
        <div className={`absolute top-[590px] left-1/2 -translate-x-1/2 md:top-[318px] md:left-1/2 md:ml-[223px] md:translate-x-0 select-none ${getZIndexClass(stickers.ghost?.layer)}`}>
          <Sticker
            id="ghost"
            src={customImages.ghost || undefined}
            alt="Classic Red Monster Ghost"
            rotation={getRotate(stickers.ghost, 14)}
            scale={getScale(stickers.ghost, 1.0)}
            offsetX="0px"
            offsetY="0px"
            customElement={customImages.ghost ? undefined : <HandBuiltGhost />}
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('ghost', e, info)}
            onSelect={() => setSelectedSticker('ghost')}
            isSelected={selectedSticker === 'ghost'}
            style={{
              ...getCoords(stickers.ghost),
              rotate: getRotate(stickers.ghost, 14),
              scale: getScale(stickers.ghost, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.ghost?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('ghost', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('ghost', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('ghost', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, ghost: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, ghost: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 5. Zombie Skeleton Hand Sticker */}
        <div className={`absolute top-[415px] left-1/2 -translate-x-1/2 md:top-[25px] md:left-1/2 md:ml-[198px] md:translate-x-0 select-none ${getZIndexClass(stickers.zombie?.layer)}`}>
          <Sticker
            id="zombie"
            src={customImages.zombie || undefined}
            alt="Zombie Approved Sticker"
            rotation={getRotate(stickers.zombie, 22)}
            scale={getScale(stickers.zombie, 1.0)}
            offsetX="0px"
            offsetY="0px"
            customElement={customImages.zombie ? undefined : <HandBuiltZombieArm />}
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('zombie', e, info)}
            onSelect={() => setSelectedSticker('zombie')}
            isSelected={selectedSticker === 'zombie'}
            style={{
              ...getCoords(stickers.zombie),
              rotate: getRotate(stickers.zombie, 22),
              scale: getScale(stickers.zombie, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.zombie?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('zombie', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('zombie', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('zombie', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, zombie: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, zombie: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 6. Dead Inside Circle Sticker */}
        <div className={`absolute top-[240px] left-[70%] -translate-x-1/2 md:top-[280px] md:left-1/2 md:ml-[23px] md:translate-x-0 select-none ${getZIndexClass(stickers.deadInside?.layer)}`}>
          <Sticker
            id="deadInside"
            src={customImages.deadInside || undefined}
            alt="Dead Inside Circle Sticker"
            rotation={getRotate(stickers.deadInside, -10)}
            scale={getScale(stickers.deadInside, 1.0)}
            offsetX="0px"
            offsetY="0px"
            customElement={customImages.deadInside ? undefined : <JaggedDeadInside />}
            draggable={isMoveMode}
            onDragEnd={(e, info) => handleDragEnd('deadInside', e, info)}
            onSelect={() => setSelectedSticker('deadInside')}
            isSelected={selectedSticker === 'deadInside'}
            style={{
              ...getCoords(stickers.deadInside),
              rotate: getRotate(stickers.deadInside, -10),
              scale: getScale(stickers.deadInside, 1.0)
            }}
            isMoveMode={isMoveMode}
            layer={stickers.deadInside?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('deadInside', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('deadInside', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('deadInside', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, deadInside: null };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
            onUploadImage={(base64) => {
              setCustomImages(prev => {
                const updated = { ...prev, deadInside: base64 };
                try { localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated)); } catch(e){}
                return updated;
              });
            }}
          />
        </div>

        {/* 4. THE MAIN DEPT OF STRANGE THINGS BLUE-LINED INDEX CARD */}
        <motion.div
           initial={{ opacity: 0, y: 30, rotate: -2 }}
           animate={{ opacity: 1, y: 0, rotate: -2 }}
           transition={{ type: 'spring', stiffness: 200, damping: 20 }}
           className="relative w-full max-w-md bg-white rounded-md p-6 sm:p-8 hover:rotate-0 transition-all duration-300 z-10 select-none shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-stone-100"
        >
          {/* Left vertical red line for margin paper style */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-rose-400 opacity-80" />

          {/* Eye stamp logo on top-left of the index card */}
          <div className="absolute left-[64px] sm:left-[72px] top-5 select-none opacity-85 flex items-center justify-center rotate-[-12deg]">
            <img
              src={ASSETS.logoBadge}
              alt="Stamp Logo"
              className="w-12 h-12 object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Lined paper texture writing area - using realistic background repeat of lines */}
          <div 
            className="pl-10 mt-12 pr-4 font-typewriter text-zinc-800 tracking-tight text-sm sm:text-base selection:bg-rose-100"
            style={{
              backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.12) 1px, transparent 1px)',
              backgroundSize: '100% 2rem',
              lineHeight: '2rem',
              minHeight: '8rem'
            }}
          >
            <p className="text-left leading-[2rem] font-medium" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              <span className="font-bold">The Department of Strange Things</span> is a fictional government agency that <span className="italic">investigates, identifies</span> and <span className="italic">contains</span> <span className="font-bold">anomalies, entities</span> and <span className="font-bold">creatures</span>.
            </p>
          </div>
        </motion.div>

        {/* 5. PORTFOLIO STICKY NOTE (Yellow notes, overlaps from right bottom, sits model-perfect lower) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
           animate={{ opacity: 1, scale: 1, rotate: 5 }}
           transition={{ type: 'spring', stiffness: 180, damping: 15, delay: 0.1 }}
           className="relative w-64 h-56 -mt-2 md:-ml-12 md:translate-y-28 md:rotate-[6deg] hover:rotate-[3deg] transition-all duration-300 z-20 select-none custom-shadow-sticker"
        >
          <div
            className="w-full h-full bg-[#fbf5be] p-6 flex flex-col justify-between overflow-hidden"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)'
            }}
          >
            {/* Subtle tactile speckles & grease/pencil marks (coffee ring removed) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
              {/* Soft pencil sketch stroke */}
              <path 
                d="M 185 35 Q 192 33, 198 48" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="1" 
                className="opacity-40"
              />
              {/* Stray paper fibers / speckles */}
              <circle cx="130" cy="120" r="1" fill="#5c4033" className="opacity-70" />
              <circle cx="38" cy="160" r="1.5" fill="#5c4033" className="opacity-45" />
              <circle cx="210" cy="140" r="0.8" fill="#5c4033" className="opacity-60" />
            </svg>

            {/* Faint fold paper creases */}
            <div className="absolute top-[35%] left-0 right-0 h-px bg-stone-900/[0.03] pointer-events-none" />
            <div className="absolute top-[70%] left-0 right-0 h-px bg-stone-900/[0.03] pointer-events-none" />

            {/* Folded Edge Corner itself (no drop shadow underneath it) */}
            <div 
              className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-[#dfd68a] to-[#ebe3a4] border-t border-l border-white/20 pointer-events-none z-20"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)'
              }}
            />

            <div className="flex-1 flex flex-col justify-center w-full relative z-10">
              <div className="text-zinc-900 font-handmade text-[28px] sm:text-[32px] leading-[1.15] text-center">
                <div>it's also</div>
                <div>my portfolio</div>
              </div>
              <div className="text-zinc-900 font-handmade text-[24px] sm:text-[28px] text-right pr-4 mt-3">
                - Joe
              </div>
            </div>
          </div>
        </motion.div>

      </section>
    </div>
  );
}

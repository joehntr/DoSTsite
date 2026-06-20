/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLURBS, ASSETS } from '../data';
import Sticker from './Sticker';
import { FileDown, Eye, User2, BadgeCheck } from 'lucide-react';
import { useStickers } from '../context/StickerContext';

const aboutDoSTImg = '/src/assets/images/aboutDoST.png';
const aboutMeImg = '/src/assets/images/aboutMe.png';

export default function AboutFolders() {
  const [activeTab, setActiveTab] = useState<'dost' | 'me'>('dost');
  const blurb = BLURBS[activeTab];

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

  const getZIndexClass = (layer?: 'front' | 'middle' | 'back') => {
    if (layer === 'back') return 'z-0 animate-fade-in';
    if (layer === 'middle') return 'z-15 animate-fade-in';
    return 'z-30';
  };

  const getCoords = (stickerState: any) => {
    if (!stickerState) return { x: 0, y: 0 };
    if (isMobile) {
      return {
        x: stickerState.mobileX !== undefined ? stickerState.mobileX : (stickerState.x || 0),
        y: stickerState.mobileY !== undefined ? stickerState.mobileY : (stickerState.y || 0),
      };
    }
    if (isTablet) {
      return {
        x: stickerState.tabletX !== undefined ? stickerState.tabletX : (stickerState.x || 0),
        y: stickerState.tabletY !== undefined ? stickerState.tabletY : (stickerState.y || 0),
      };
    }
    return {
      x: stickerState.x || 0,
      y: stickerState.y || 0,
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

  // Draw custom sunglasses skull sticker in SVG
  const SkullSticker = () => (
    <div className="flex flex-col items-center select-none w-14 p-1">
      <div className="relative w-12 h-10 bg-slate-100 border-2 border-black rounded-t-full flex items-center justify-center">
        {/* Sunglasses */}
        <div className="absolute top-2 w-10 h-3 flex gap-0.5 justify-around px-0.5 z-10">
          <div className="w-4 h-3 bg-fuchsia-500 border border-black rounded-sm rotate-6" />
          <div className="w-4 h-3 bg-fuchsia-500 border border-black rounded-sm -rotate-6" />
        </div>
        {/* Nose cavity */}
        <div className="w-1.5 h-1.5 bg-black rotate-45 mt-4" />
      </div>
      {/* Teeth block */}
      <div className="w-7 h-2.5 bg-slate-100 border-x-2 border-b-2 border-black flex justify-around px-0.5">
        <div className="w-0.5 h-full bg-black/40" />
        <div className="w-0.5 h-full bg-black/40" />
        <div className="w-0.5 h-full bg-black/40" />
      </div>
    </div>
  );

  const DesignTagSticker = () => (
    <div className="flex items-center bg-[#fef236] border-2 border-black rounded p-1 custom-shadow-sticker select-none">
      <span className="font-mono text-[9px] font-bold text-black tracking-tight flex items-center gap-1 px-1 select-none whitespace-nowrap">
        ✏️ DESIGN
      </span>
    </div>
  );

  return (
    <section id="about" className="max-w-4xl mx-auto px-4 py-16 overflow-visible relative">
      {/* Section Head */}
      <div className="text-center mb-14">
        <h2 className="font-sans font-black text-xl tracking-[0.18em] uppercase leading-snug text-neutral-900 inline-block">
          ABOUT
        </h2>
      </div>

      {/* Folders Layout Stage */}
      <div className="relative flex flex-col items-center overflow-visible w-full">
             {/* Folder Tabs bar */}
        <div className="flex w-full max-w-2xl justify-center gap-2 md:gap-6 relative overflow-visible items-end z-20">
          
          {/* FOLDER A: ABOUT DoST */}
          <button
            onClick={() => setActiveTab('dost')}
            className={`group relative transition-all duration-300 focus:outline-none cursor-pointer shrink-0 ${
              activeTab === 'dost'
                ? 'z-20 -translate-y-1 scale-105 opacity-100'
                : 'z-10 hover:-translate-y-0.5 opacity-100'
            }`}
            id="tab_folder_dost"
          >
            <img
              src={aboutDoSTImg}
              alt="ABOUT DoST"
              className="w-36 md:w-56 h-auto object-contain cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* FOLDER B: ABOUT ME */}
          <button
            onClick={() => setActiveTab('me')}
            className={`group relative transition-all duration-300 focus:outline-none cursor-pointer shrink-0 ${
              activeTab === 'me'
                ? 'z-20 -translate-y-4 md:-translate-y-6 scale-105 opacity-100'
                : 'z-10 -translate-y-3 md:-translate-y-5 hover:-translate-y-4 md:hover:-translate-y-6 opacity-100'
            }`}
            id="tab_folder_me"
          >
            <img
              src={aboutMeImg}
              alt="ABOUT ME"
              className="w-32 md:w-52 h-auto object-contain cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </button>

        </div>

        {/* --- STICKERS PLACED AROUND THE FOLDERS --- */}

        {/* 1. Yellow & Black pencil on Left next to Blue Folder */}
        <div className={`absolute left-1/2 -ml-[135px] md:-ml-[230px] top-3 select-none ${getZIndexClass(stickers.aboutDesign?.layer)}`}>
          <Sticker
            id="aboutDesign"
            alt="Design Tag Sticker"
            rotation={getRotate(stickers.aboutDesign, 45)}
            scale={getScale(stickers.aboutDesign, 1.0)}
            draggable={isMoveMode}
            isMoveMode={isMoveMode}
            onSelect={() => setSelectedSticker('aboutDesign')}
            isSelected={selectedSticker === 'aboutDesign'}
            onDragEnd={(e, info) => handleDragEnd('aboutDesign', e, info)}
            customElement={customImages.aboutDesign ? undefined : <DesignTagSticker />}
            src={customImages.aboutDesign || undefined}
            style={{
              ...getCoords(stickers.aboutDesign),
              rotate: getRotate(stickers.aboutDesign, 45),
              scale: getScale(stickers.aboutDesign, 1.0)
            }}
            layer={stickers.aboutDesign?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('aboutDesign', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('aboutDesign', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('aboutDesign', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutDesign: null };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
            onUploadImage={(base64Str) => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutDesign: base64Str };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
          />
        </div>

        {/* 2. Joseph Hunter's Comic Face Avatar badge on Yellow Folder */}
        <div className={`absolute left-1/2 ml-[65px] md:ml-[115px] top-[10px] select-none ${getZIndexClass(stickers.aboutAvatar?.layer)}`}>
          <Sticker
            id="aboutAvatar"
            src={customImages.aboutAvatar || ASSETS.stickerAvatar}
            alt="Joseph Hunter Avatar Badge"
            rotation={getRotate(stickers.aboutAvatar, 10)}
            scale={getScale(stickers.aboutAvatar, 1.0)}
            width="w-14 sm:w-16"
            draggable={isMoveMode}
            isMoveMode={isMoveMode}
            onSelect={() => setSelectedSticker('aboutAvatar')}
            isSelected={selectedSticker === 'aboutAvatar'}
            onDragEnd={(e, info) => handleDragEnd('aboutAvatar', e, info)}
            style={{
              ...getCoords(stickers.aboutAvatar),
              rotate: getRotate(stickers.aboutAvatar, 10),
              scale: getScale(stickers.aboutAvatar, 1.0)
            }}
            layer={stickers.aboutAvatar?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('aboutAvatar', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('aboutAvatar', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('aboutAvatar', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutAvatar: null };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
            onUploadImage={(base64Str) => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutAvatar: base64Str };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
          />
        </div>

        {/* 3. Sunglasses skull sticker below Blue folder tab */}
        <div className={`absolute left-1/2 -ml-[110px] md:-ml-[170px] top-14 md:top-16 select-none ${getZIndexClass(stickers.aboutSkull?.layer)}`}>
          <Sticker
            id="aboutSkull"
            alt="Sunny Skull Sticker"
            rotation={getRotate(stickers.aboutSkull, -15)}
            scale={getScale(stickers.aboutSkull, 1.0)}
            draggable={isMoveMode}
            isMoveMode={isMoveMode}
            onSelect={() => setSelectedSticker('aboutSkull')}
            isSelected={selectedSticker === 'aboutSkull'}
            onDragEnd={(e, info) => handleDragEnd('aboutSkull', e, info)}
            customElement={customImages.aboutSkull ? undefined : <SkullSticker />}
            src={customImages.aboutSkull || undefined}
            style={{
              ...getCoords(stickers.aboutSkull),
              rotate: getRotate(stickers.aboutSkull, -15),
              scale: getScale(stickers.aboutSkull, 1.0)
            }}
            layer={stickers.aboutSkull?.layer || 'front'}
            onLayerChange={(l) => handleUpdateStickerSetting('aboutSkull', 'layer', l)}
            onScaleChange={(s) => handleUpdateStickerSetting('aboutSkull', 'scale', s)}
            onRotateChange={(r) => handleUpdateStickerSetting('aboutSkull', 'rotate', r)}
            onResetImage={() => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutSkull: null };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
            onUploadImage={(base64Str) => {
              setCustomImages(prev => {
                const updated = { ...prev, aboutSkull: base64Str };
                try {
                  localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }}
          />
        </div>

        {/* Content Box - Transparent center-aligned text block */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="w-full max-w-2xl text-center py-12 px-4 sm:px-8 relative z-10"
        >
          <h3 className="font-sans font-black text-lg tracking-[0.15em] uppercase leading-snug text-neutral-900 mb-6">
            {blurb.title}
          </h3>

          {/* Description Paragraphs block - centered without indent */}
          <div className="space-y-4 text-stone-900 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto font-medium">
            {blurb.paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

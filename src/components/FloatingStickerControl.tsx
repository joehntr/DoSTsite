/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStickers } from '../context/StickerContext';
import { useProjects } from '../context/ProjectContext';
import { Settings, X, Lock, Unlock, RefreshCw, Layers, Shield, Image as ImageIcon, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Move, Copy, FileCode } from 'lucide-react';

// Read all files inside assets/images using Vite's import.meta.glob
const imageModules = (import.meta as any).glob('/src/assets/images/*', { eager: true });
const STICKER_FOLDER_IMAGES = Object.entries(imageModules)
  .filter(([path]) => {
    const filename = path.split('/').pop()?.toLowerCase() || '';
    return filename.includes('sticker');
  })
  .map(([path, mod]: any) => {
    const filename = path.split('/').pop() || '';
    const resolvedUrl = mod.default || mod;
    return {
      path,
      filename,
      name: filename
        .replace(/\.[^/.]+$/, "") // strip extension
        .replace(/([A-Z])/g, ' $1') // space before capital letters
        .replace(/[_\s-]+/g, ' ') // clean spaces
        .trim(),
      url: resolvedUrl,
    };
  });

export default function FloatingStickerControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [nudgeStep, setNudgeStep] = useState<number>(5);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { projects } = useProjects();

  const {
    isMoveMode,
    setIsMoveMode,
    selectedSticker,
    setSelectedSticker,
    stickers,
    customImages,
    setCustomImages,
    handleUpdateStickerSetting,
    handleNudgeSticker,
    handleResetBoard,
    stickerNames,
    handleSaveBoardAsDefault,
    handleClearBoardDefault,
    hasSavedDefault,
    isMobile,
    isTablet
  } = useStickers();

  const generateExportCode = () => {
    const cleanStickers = JSON.stringify(stickers, null, 2);
    const cleanCustomImages = JSON.stringify(customImages, null, 2);
    
    const sortedProjectMapping = [...projects]
      .sort((a, b) => {
        if (a.column !== b.column) return a.column - b.column;
        return a.order - b.order;
      })
      .map(p => ({
        id: p.id,
        column: p.column,
        order: p.order
      }));

    const cleanProjectsMapping = JSON.stringify(sortedProjectMapping, null, 2)
      .replace(/"column": 1/g, '"column": 1 as const')
      .replace(/"column": 2/g, '"column": 2 as const')
      .replace(/"column": 3/g, '"column": 3 as const');

    return `/**
 * LOCKED PRODUCTION LAYOUT CONFIGURATION
 * 
 * Generated with Department of Strange Things Layout Studio.
 * Copy and paste this complete code to overwrite '/src/lockedLayout.ts'.
 */

export const LOCKED_STICKERS = ${cleanStickers};

export const LOCKED_CUSTOM_IMAGES = ${cleanCustomImages};

export const LOCKED_PROJECT_MAPPING = ${cleanProjectsMapping};
`;
  };

  // Group stickers for clean sectioned picker
  const boardStickers = ['alien', 'pencil', 'can', 'ghost', 'zombie', 'deadInside'];
  const aboutStickers = ['aboutAvatar', 'aboutSkull', 'aboutDesign'];

  const selectedStickerObj = stickers[selectedSticker] || { scale: 1.0, rotate: 0, layer: 'front' };

  const responsiveScale = (() => {
    if (isMobile) {
      return selectedStickerObj.mobileScale !== undefined ? selectedStickerObj.mobileScale : (selectedStickerObj.scale ?? 1.0);
    }
    if (isTablet) {
      return selectedStickerObj.tabletScale !== undefined ? selectedStickerObj.tabletScale : (selectedStickerObj.scale ?? 1.0);
    }
    return selectedStickerObj.scale ?? 1.0;
  })();

  const responsiveRotate = (() => {
    if (isMobile) {
      return selectedStickerObj.mobileRotate !== undefined ? selectedStickerObj.mobileRotate : (selectedStickerObj.rotate ?? 0);
    }
    if (isTablet) {
      return selectedStickerObj.tabletRotate !== undefined ? selectedStickerObj.tabletRotate : (selectedStickerObj.rotate ?? 0);
    }
    return selectedStickerObj.rotate ?? 0;
  })();

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
        const MAX_WIDTH = 400;
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
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/png');
          setCustomImages(prev => {
            const updated = { ...prev, [selectedSticker]: compressed };
            try {
              localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
            } catch (err) {
              console.warn(err);
            }
            return updated;
          });
        } else {
          setCustomImages(prev => {
            const updated = { ...prev, [selectedSticker]: base64Str };
            try {
              localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
            } catch (err) {
              console.warn(err);
            }
            return updated;
          });
        }
      };
    };
    e.target.value = '';
  };

  const handleResetImage = () => {
    setCustomImages(prev => {
      const updated = { ...prev, [selectedSticker]: null };
      try {
        localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
      } catch (err) {
        console.warn(err);
      }
      return updated;
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono select-none pointer-events-auto">
      <AnimatePresence>
        {/* Expanded Controls Card */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 sm:w-96 bg-stone-90 border-2 border-stone-900 rounded-lg shadow-[6px_6px_0_0_rgba(28,25,23,1)] overflow-hidden bg-white mb-3"
          >
            {/* Header banner */}
            <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between border-b-2 border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                <span className="font-sans font-black text-xs uppercase tracking-widest">
                  STICKER STUDIO PANEL
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                title="Minimize panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Actions Toolbar */}
            <div className="p-4 border-b border-stone-100 bg-stone-50 space-y-2.5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => setIsMoveMode(!isMoveMode)}
                  className={`flex-1 py-1.5 px-3 rounded flex items-center justify-center gap-1.5 text-xs font-sans font-black uppercase tracking-wider duration-150 transition-all border shadow-[2px_2px_0_0_rgba(28,25,23,1)] border-stone-900 ${
                    isMoveMode
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'bg-white hover:bg-stone-100 text-stone-900'
                  }`}
                >
                  {isMoveMode ? <Unlock size={14} className="shrink-0" /> : <Lock size={14} className="shrink-0" />}
                  {isMoveMode ? 'UNLOCK ACTIVE' : 'LOCK WORKSPACE'}
                </button>

                <button
                  onClick={handleResetBoard}
                  className="py-1.5 px-3 bg-white hover:bg-stone-100 border border-stone-900 rounded text-xs font-sans font-black uppercase tracking-wider duration-150 transition-colors shadow-[2px_2px_0_0_rgba(28,25,23,1)] text-stone-700"
                  title={hasSavedDefault ? "Reset board to your custom default setup" : "Reset board to factory setting"}
                >
                  RESET ALL
                </button>
              </div>

              {/* Custom Default Persistence Option */}
              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-stone-200">
                <button
                  onClick={() => {
                    handleSaveBoardAsDefault();
                    setShowSavedToast(true);
                    setTimeout(() => setShowSavedToast(false), 2000);
                  }}
                  className={`flex-1 py-1 px-2 border text-[10px] font-sans font-extrabold uppercase rounded shadow-[1px_1px_0_0_rgba(28,25,23,1)] transition-transform active:scale-95 text-center flex items-center justify-center gap-1 cursor-pointer ${
                    showSavedToast
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-300 text-indigo-800'
                  }`}
                  title="Make this current set of positions, sizes, rotations & images your standard default for resets!"
                >
                  {showSavedToast ? '✅ Layout Saved as Default!' : '📌 Make Current Layout Default'}
                </button>
                
                {hasSavedDefault && (
                  <button
                    onClick={handleClearBoardDefault}
                    className="py-1 px-2 bg-stone-105 hover:bg-rose-50 border border-stone-300 text-stone-600 hover:text-rose-750 text-[10px] font-sans font-extrabold uppercase rounded transition-colors text-center cursor-pointer"
                    title="Remove your custom defaults and restore initial factory layouts"
                  >
                    🗑️ Clear Saved
                  </button>
                )}
              </div>

              {/* GitHub Export / Finalizing Code Option */}
              <div className="pt-2.5 border-t border-stone-200">
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="w-full py-1.5 px-3 bg-amber-50 hover:bg-amber-100 border-2 border-stone-900 text-stone-900 text-[10px] font-sans font-black uppercase rounded shadow-[2px_2px_0_0_rgba(28,25,23,1)] transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(28,25,23,1)] text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Export your current visual layout as code to permanently lock elements when importing/uploading to GitHub!"
                >
                  <FileCode size={12} className="text-amber-600" />
                  <span>🔒 LOCK & EXPORT CONFIG</span>
                </button>
              </div>
            </div>

            {/* Panel details */}
            <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto custom-scroll">
              
              {/* If workspace is locked */}
              {!isMoveMode ? (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded text-[11px] leading-relaxed text-rose-800 text-center font-sans font-semibold">
                  <span>💡 Click <strong className="font-extrabold text-rose-950">"LOCK WORKSPACE"</strong> to enable custom scaling, rotations, layer-depth adjustment, or even replacing stickers with your own photos!</span>
                </div>
              ) : (
                <>
                  {/* Select Sticker Step */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider flex items-center gap-1">
                      <span>1. CHOOSE TARGET STICKER:</span>
                    </span>
                    <select
                      value={selectedSticker}
                      onChange={(e) => setSelectedSticker(e.target.value)}
                      className="w-full text-xs font-mono font-bold py-1.5 px-2.5 bg-white border-2 border-stone-900 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
                    >
                      <optgroup label="BOARD STICKERS (INDEX CARD)">
                        {boardStickers.map(key => (
                          <option key={key} value={key}>{stickerNames[key] || key}</option>
                        ))}
                      </optgroup>
                      <optgroup label="ABOUT SEC. STICKERS (DOSSIER)">
                        {aboutStickers.map(key => (
                          <option key={key} value={key}>{stickerNames[key] || key}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-4 pt-1 text-left">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-1 font-mono">
                      <span className="text-[10px] font-bold text-stone-800 uppercase tracking-tight">
                        2. EDIT: <span className="text-rose-500">{stickerNames[selectedSticker]?.split(' ')[0] || selectedSticker}</span>
                      </span>

                      {/* Photo selector */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 px-2 py-0.5 rounded font-black transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <ImageIcon size={11} />
                        REPLACE
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Folder Image Quick Picker */}
                    <div className="space-y-1.5 p-2 bg-stone-55 rounded border border-stone-200 bg-stone-50">
                      <div className="flex items-center justify-between text-[10px] font-bold text-stone-600">
                        <span>📁 PICK FROM IMAGES FOLDER:</span>
                        <span className="text-[10px] text-zinc-400 font-extrabold">{STICKER_FOLDER_IMAGES.length} IMAGES</span>
                      </div>
                      
                      {/* Dropdown list of matching images */}
                      <select
                        value={customImages[selectedSticker] || ''}
                        onChange={(e) => {
                          const val = e.target.value || null;
                          setCustomImages(prev => {
                            const updated = { ...prev, [selectedSticker]: val };
                            try {
                              localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                            } catch (err) {
                              console.warn(err);
                            }
                            return updated;
                          });
                        }}
                        className="w-full text-[11px] font-mono font-black py-1 px-1.5 bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                        id="folder_sticker_select_dropdown"
                      >
                        <option value="">[Use Default / Hand-drawn Illustration]</option>
                        {STICKER_FOLDER_IMAGES.map((imgItem) => (
                          <option key={imgItem.path} value={imgItem.url}>
                            {imgItem.filename}
                          </option>
                        ))}
                      </select>

                      {/* Visual Thumbnail Grid Picker */}
                      {STICKER_FOLDER_IMAGES.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mt-2 pt-1.5 border-t border-stone-200/50 max-h-24 overflow-y-auto custom-scroll bg-stone-100/40 p-1 rounded">
                          {STICKER_FOLDER_IMAGES.map((imgItem) => {
                            const isActiveInSticker = customImages[selectedSticker] === imgItem.url;
                            return (
                              <button
                                key={imgItem.path}
                                type="button"
                                onClick={() => {
                                  setCustomImages(prev => {
                                    const updated = { ...prev, [selectedSticker]: imgItem.url };
                                    try {
                                      localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(updated));
                                    } catch (err) {
                                      console.warn(err);
                                    }
                                    return updated;
                                  });
                                }}
                                className={`relative aspect-square rounded overflow-hidden bg-white border-2 flex items-center justify-center p-1 cursor-pointer transition-all hover:scale-105 ${
                                  isActiveInSticker
                                    ? 'border-rose-500 ring-2 ring-rose-300/30'
                                    : 'border-stone-200 hover:border-stone-400'
                                }`}
                                title={imgItem.filename}
                              >
                                <img
                                  src={imgItem.url}
                                  alt={imgItem.name}
                                  className="max-w-full max-h-full object-contain pointer-events-none"
                                  referrerPolicy="no-referrer"
                                />
                                {isActiveInSticker && (
                                  <div className="absolute inset-0 bg-rose-500/10 flex items-end justify-center">
                                    <span className="bg-rose-500 text-white font-sans text-[7px] font-black px-1 py-0.5 rounded-t scale-95 leading-none w-full text-center">
                                      ACTIVE
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Scale adjustment slider */}
                    <div className="space-y-2 p-2.5 bg-stone-50 border border-stone-200 rounded">
                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Move size={12} className="text-stone-600" />
                          <span>🕹️ POSITION NUDGEPAD:</span>
                        </span>
                        <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 font-mono">
                          {nudgeStep}PX STEPS
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3 pt-1">
                        {/* Compact D-pad grid layout */}
                        <div className="grid grid-cols-3 gap-1 w-28 h-[84px] shrink-0">
                          {/* Row 1 */}
                          <div></div>
                          <button
                            type="button"
                            onClick={() => handleNudgeSticker(selectedSticker, 'up', nudgeStep)}
                            className="bg-white hover:bg-stone-100 active:bg-stone-250 border-2 border-stone-900 rounded flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-[1.5px_1.5px_0_0_rgba(28,25,23,1)] hover:shadow-[0.5px_0.5px_0_0_rgba(28,25,23,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                            title={`Nudge Up (${nudgeStep}px)`}
                          >
                            <ChevronUp size={16} className="text-stone-900 stroke-[2.5]" />
                          </button>
                          <div></div>

                          {/* Row 2 */}
                          <button
                            type="button"
                            onClick={() => handleNudgeSticker(selectedSticker, 'left', nudgeStep)}
                            className="bg-white hover:bg-stone-100 active:bg-stone-250 border-2 border-stone-900 rounded flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-[1.5px_1.5px_0_0_rgba(28,25,23,1)] hover:shadow-[0.5px_0.5px_0_0_rgba(28,25,23,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                            title={`Nudge Left (${nudgeStep}px)`}
                          >
                            <ChevronLeft size={16} className="text-stone-900 stroke-[2.5]" />
                          </button>
                          <div className="flex items-center justify-center text-[8px] font-sans font-black text-rose-500 bg-stone-100 rounded border border-dashed border-stone-300">
                            PAD
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNudgeSticker(selectedSticker, 'right', nudgeStep)}
                            className="bg-white hover:bg-stone-100 active:bg-stone-250 border-2 border-stone-900 rounded flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-[1.5px_1.5px_0_0_rgba(28,25,23,1)] hover:shadow-[0.5px_0.5px_0_0_rgba(28,25,23,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                            title={`Nudge Right (${nudgeStep}px)`}
                          >
                            <ChevronRight size={16} className="text-stone-900 stroke-[2.5]" />
                          </button>

                          {/* Row 3 */}
                          <div></div>
                          <button
                            type="button"
                            onClick={() => handleNudgeSticker(selectedSticker, 'down', nudgeStep)}
                            className="bg-white hover:bg-stone-100 active:bg-stone-250 border-2 border-stone-900 rounded flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-[1.5px_1.5px_0_0_rgba(28,25,23,1)] hover:shadow-[0.5px_0.5px_0_0_rgba(28,25,23,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                            title={`Nudge Down (${nudgeStep}px)`}
                          >
                            <ChevronDown size={16} className="text-stone-900 stroke-[2.5]" />
                          </button>
                          <div></div>
                        </div>

                        {/* Nudge speed block */}
                        <div className="flex-1 flex flex-col gap-1 text-[9px] font-bold text-stone-600">
                          <span className="uppercase text-[8px] text-stone-400 tracking-wider">CLICK ACCURACY:</span>
                          <div className="grid grid-cols-3 gap-1 bg-stone-100 p-0.5 rounded border border-stone-200">
                            {[1, 5, 20].map((step) => {
                              const label = step === 1 ? '1px' : step === 5 ? '5px' : '20px';
                              const desc = step === 1 ? 'Micro' : step === 5 ? 'Std' : 'Fast';
                              return (
                                <button
                                  key={step}
                                  type="button"
                                  onClick={() => setNudgeStep(step)}
                                  className={`py-1 text-[9px] font-black rounded cursor-pointer leading-dense text-center transition-all ${
                                    nudgeStep === step
                                      ? 'bg-white text-stone-900 shadow-sm border border-stone-300'
                                      : 'text-stone-500 hover:text-stone-800'
                                  }`}
                                  title={`${desc} step size`}
                                >
                                  <div>{label}</div>
                                  <div className="text-[6px] text-stone-400 font-normal tracking-tight uppercase leading-none">{desc}</div>
                                </button>
                              );
                            })}
                          </div>
                          <div className="text-[7.5px] text-stone-400 font-normal leading-normal whitespace-pre-line lowercase italic mt-0.5">
                            * push stickers on any device with precise offset controls.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scale adjustment slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold">
                        <span>🔍 SCALE ASPECT:</span>
                        <span className="font-bold text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded text-[9px]">
                          {responsiveScale.toFixed(1)}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.3"
                        max="2.5"
                        step="0.1"
                        value={responsiveScale}
                        onChange={(e) => handleUpdateStickerSetting(selectedSticker, 'scale', parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-ew-resize py-1"
                      />
                    </div>

                    {/* Rotation adjustment slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold">
                        <span>🔄 ROTATION ANGLE:</span>
                        <span className="font-bold text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded text-[9px]">
                          {responsiveRotate}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        value={responsiveRotate}
                        onChange={(e) => handleUpdateStickerSetting(selectedSticker, 'rotate', parseInt(e.target.value))}
                        className="w-full accent-rose-500 cursor-ew-resize py-1"
                      />
                    </div>

                    {/* Layer depth buttons */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold">
                        <span>🥞 LAYER DEPTH STACK:</span>
                        <span className="font-bold text-stone-800 bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded uppercase text-[9px]">
                          {selectedStickerObj.layer === 'back'
                            ? 'Behind all'
                            : selectedStickerObj.layer === 'middle'
                            ? 'Inside / behind note'
                            : 'On Very Top'
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded font-mono text-[9px] text-center border border-stone-200">
                        {(['front', 'middle', 'back'] as const).map(lev => (
                          <button
                            key={lev}
                            type="button"
                            onClick={() => handleUpdateStickerSetting(selectedSticker, 'layer', lev)}
                            className={`py-1 rounded cursor-pointer leading-none uppercase font-bold transition-all ${
                              (selectedStickerObj.layer || 'front') === lev
                                ? 'bg-white text-stone-900 shadow-sm'
                                : 'text-stone-500 hover:text-stone-800'
                            }`}
                          >
                            {lev === 'front' ? 'FRONT' : lev === 'middle' ? 'MID' : 'BACK'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Revert Image button if customized */}
                    {customImages[selectedSticker] && (
                      <button
                        onClick={handleResetImage}
                        className="w-full py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-300 text-[10px] font-bold rounded cursor-pointer transition-colors"
                      >
                        ♻️ REVERT CUSTOM UPLOAD TO ILLUSTRATION
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Status footer inside control */}
              <div className="text-[8px] text-stone-400 font-mono tracking-wider pt-2 border-t border-stone-100 uppercase text-center flex items-center justify-center gap-1">
                <Shield size={9} className="text-zinc-400" />
                <span>DEPT. STICKER LAB V5</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger floating button launcher (A cute badge style with a gear and sparkling accents) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-950 hover:bg-rose-600 text-white rounded-full border-2 border-stone-900 cursor-pointer shadow-[3px_3px_0_0_rgb(28,25,23)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgb(28,25,23)]"
        id="sticker_studio_trigger_btn"
      >
        <span className="p-0.5 bg-white/10 rounded-full">
          <Settings size={16} className={`text-white ${isOpen ? 'rotate-90' : 'animate-spin-slow'}`} />
        </span>
        <span className="font-sans font-black text-xs uppercase tracking-wider pr-1">
          {isOpen ? 'CLOSE DESIGNER' : 'STICKER STUDIO'}
        </span>
        {isMoveMode && (
          <span className="bg-rose-500 text-white font-extrabold text-[8px] tracking-widest px-1.5 py-0.5 rounded-full uppercase scale-90 -mr-1 animate-pulse">
            EDITING
          </span>
        )}
      </button>

      {/* EXPORT CODE DIALOG MODAL */}
      <AnimatePresence>
        {isExportOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono text-stone-900 leading-normal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-white border-2 border-stone-900 rounded-lg shadow-[8px_8px_0_0_rgba(28,25,23,1)] overflow-hidden"
            >
              {/* Modal Head */}
              <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between border-b-2 border-stone-200">
                <div className="flex items-center gap-2">
                  <FileCode size={18} className="text-amber-400" />
                  <span className="font-sans font-black text-xs uppercase tracking-widest">
                    EXPORTER & FREEZER PANEL
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsExportOpen(false);
                    setCopied(false);
                  }}
                  className="hover:text-rose-400 p-1 cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Instructions Callout */}
              <div className="p-4 bg-amber-50/50 border-b border-stone-200 text-[10px] leading-relaxed space-y-2 text-left">
                <p className="font-sans font-black text-[11px] text-amber-900 uppercase tracking-tight">
                  📌 How to Lock Your Layout for GitHub:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-stone-700 font-sans">
                  <li>Configure your stickers and gallery order exactly where you want them in this preview.</li>
                  <li>Click <b className="font-black text-stone-900">"Copy Code"</b> below to grab the layout asset values.</li>
                  <li>In your file explorer, open <code className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded font-mono font-bold text-stone-900">/src/lockedLayout.ts</code> and replace its content completely by pasting this code.</li>
                  <li><b>Done!</b> Your custom state is frozen as the new global default. The studios will hide automatically when uploaded/built on GitHub!</li>
                </ol>
              </div>

              {/* Codegen Area */}
              <div className="p-4 space-y-3">
                <textarea
                  readOnly
                  value={generateExportCode()}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  className="w-full h-64 px-3 py-2 bg-stone-50 border-2 border-stone-900 rounded font-mono text-[9px] leading-relaxed select-all focus:outline-none custom-scroll resize-none text-left"
                />

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[9px] text-stone-500 font-sans italic text-left max-w-[240px] leading-tight">
                    This captures active sticker offsets, custom graphic replacements, rotations, depths, and masonry channels.
                  </span>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateExportCode());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    }}
                    className={`px-4 py-2 text-[10px] font-sans font-black uppercase tracking-wider rounded border-2 border-stone-900 shadow-[3px_3px_0_0_rgba(28,25,23,1)] hover:bg-stone-100 cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgba(28,25,23,1)] flex items-center gap-1.5 ${
                      copied ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-white text-stone-900'
                    }`}
                  >
                    <Copy size={12} />
                    <span>{copied ? '✅ COPIED!' : 'COPY CODE'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOCKED_STICKERS, LOCKED_CUSTOM_IMAGES } from '../lockedLayout';

export interface StickerState {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  layer?: 'front' | 'middle' | 'back';
  mobileX?: number;
  mobileY?: number;
  tabletX?: number;
  tabletY?: number;
  mobileScale?: number;
  mobileRotate?: number;
  tabletScale?: number;
  tabletRotate?: number;
}

interface StickerContextType {
  isMoveMode: boolean;
  setIsMoveMode: (val: boolean) => void;
  selectedSticker: string;
  setSelectedSticker: (val: string) => void;
  stickers: { [key: string]: StickerState };
  customImages: { [key: string]: string | null };
  setCustomImages: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
  handleDragEnd: (key: string, event: any, info: any) => void;
  handleUpdateStickerSetting: (key: string, field: 'scale' | 'rotate' | 'layer', value: any) => void;
  handleNudgeSticker: (key: string, direction: 'left' | 'right' | 'up' | 'down', amount?: number) => void;
  handleResetBoard: () => void;
  stickerNames: { [key: string]: string };
  isMobile: boolean;
  isTablet: boolean;
  handleSaveBoardAsDefault: () => void;
  handleClearBoardDefault: () => void;
  hasSavedDefault: boolean;
}

const StickerContext = createContext<StickerContextType | undefined>(undefined);

export function StickerProvider({ children }: { children: React.ReactNode }) {
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string>('alien');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hasSavedDefault, setHasSavedDefault] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        return !!localStorage.getItem('dost_stickers_user_defaults');
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Unified configurations representing offsets, scale multipliers and custom rotations
  const [stickers, setStickers] = useState<{ [key: string]: StickerState }>(() => {
    try {
      const saved = localStorage.getItem('dost_stickers_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.aboutDesign) {
          parsed.aboutDesign = { x: 0, y: 0, scale: 1.0, rotate: 45, layer: 'front' };
        }
        return parsed;
      }
      const savedV6 = localStorage.getItem('dost_stickers_v6');
      if (savedV6) {
        const parsed = JSON.parse(savedV6);
        if (!parsed.aboutDesign) {
          parsed.aboutDesign = { x: 0, y: 0, scale: 1.0, rotate: 45, layer: 'front' };
        }
        try {
          localStorage.setItem('dost_stickers_v7', JSON.stringify(parsed));
        } catch (e) {}
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return LOCKED_STICKERS;
  });

  const [customImages, setCustomImages] = useState<{ [key: string]: string | null }>(() => {
    try {
      const saved = localStorage.getItem('dost_custom_stickers_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.aboutDesign === undefined) {
          parsed.aboutDesign = null;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return LOCKED_CUSTOM_IMAGES;
  });

  const stickerNames: { [key: string]: string } = {
    alien: 'Green Alien Head (Board)',
    pencil: 'Spiral Pencil (Board)',
    can: 'Soda Can Cartoon (Board)',
    ghost: 'Red Monster Ghost (Board)',
    zombie: 'Skeleton Arm (Board)',
    deadInside: 'Dead Inside Stamp (Board)',
    aboutAvatar: 'Joe Avatar Badge (About)',
    aboutSkull: 'Sunny Skull (About)',
    aboutDesign: 'Design Tag (About)',
  };

  const handleDragEnd = (key: string, event: any, info: any) => {
    setStickers(prev => {
      const current = prev[key] || { x: 0, y: 0, scale: 1.0, rotate: 0, layer: 'front' };
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const isMobileScreen = width < 768;
      const isTabletScreen = width >= 768 && width < 1024;
      
      let updated;
      if (isMobileScreen) {
        // Fallback to desktop coords if mobile coords haven't been customized yet
        const currentMobX = current.mobileX !== undefined ? current.mobileX : current.x;
        const currentMobY = current.mobileY !== undefined ? current.mobileY : current.y;
        
        updated = {
          ...prev,
          [key]: {
            ...current,
            mobileX: currentMobX + info.offset.x,
            mobileY: currentMobY + info.offset.y
          }
        };
      } else if (isTabletScreen) {
        // Fallback to desktop coords if tablet coords haven't been customized yet
        const currentTabX = current.tabletX !== undefined ? current.tabletX : current.x;
        const currentTabY = current.tabletY !== undefined ? current.tabletY : current.y;
        
        updated = {
          ...prev,
          [key]: {
            ...current,
            tabletX: currentTabX + info.offset.x,
            tabletY: currentTabY + info.offset.y
          }
        };
      } else {
        updated = {
          ...prev,
          [key]: {
            ...current,
            x: current.x + info.offset.x,
            y: current.y + info.offset.y
          }
        };
      }
      localStorage.setItem('dost_stickers_v7', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateStickerSetting = (key: string, field: 'scale' | 'rotate' | 'layer', value: any) => {
    setStickers(prev => {
      const current = prev[key] || { x: 0, y: 0, scale: 1.0, rotate: 0, layer: 'front' };
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const isMobileScreen = width < 768;
      const isTabletScreen = width >= 768 && width < 1024;

      let updatedFields: Partial<StickerState> = {};
      if (field === 'scale') {
        if (isMobileScreen) {
          updatedFields = { mobileScale: value };
        } else if (isTabletScreen) {
          updatedFields = { tabletScale: value };
        } else {
          updatedFields = { scale: value };
        }
      } else if (field === 'rotate') {
        if (isMobileScreen) {
          updatedFields = { mobileRotate: value };
        } else if (isTabletScreen) {
          updatedFields = { tabletRotate: value };
        } else {
          updatedFields = { rotate: value };
        }
      } else {
        updatedFields = { [field]: value };
      }

      const updated = {
        ...prev,
        [key]: {
          ...current,
          ...updatedFields
        }
      };
      localStorage.setItem('dost_stickers_v7', JSON.stringify(updated));
      return updated;
    });
  };

  const handleNudgeSticker = (key: string, direction: 'left' | 'right' | 'up' | 'down', amount: number = 5) => {
    setStickers(prev => {
      const current = prev[key] || { x: 0, y: 0, scale: 1.0, rotate: 0, layer: 'front' };
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const isMobileScreen = width < 768;
      const isTabletScreen = width >= 768 && width < 1024;

      let dx = 0;
      let dy = 0;
      if (direction === 'left') dx = -amount;
      if (direction === 'right') dx = amount;
      if (direction === 'up') dy = -amount;
      if (direction === 'down') dy = amount;

      let updated;
      if (isMobileScreen) {
        const currentMobX = current.mobileX !== undefined ? current.mobileX : current.x;
        const currentMobY = current.mobileY !== undefined ? current.mobileY : current.y;
        updated = {
          ...prev,
          [key]: {
            ...current,
            mobileX: currentMobX + dx,
            mobileY: currentMobY + dy
          }
        };
      } else if (isTabletScreen) {
        const currentTabX = current.tabletX !== undefined ? current.tabletX : current.x;
        const currentTabY = current.tabletY !== undefined ? current.tabletY : current.y;
        updated = {
          ...prev,
          [key]: {
            ...current,
            tabletX: currentTabX + dx,
            tabletY: currentTabY + dy
          }
        };
      } else {
        updated = {
          ...prev,
          [key]: {
            ...current,
            x: current.x + dx,
            y: current.y + dy
          }
        };
      }
      localStorage.setItem('dost_stickers_v7', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveBoardAsDefault = () => {
    localStorage.setItem('dost_stickers_user_defaults', JSON.stringify(stickers));
    localStorage.setItem('dost_custom_stickers_user_defaults', JSON.stringify(customImages));
    setHasSavedDefault(true);
  };

  const handleClearBoardDefault = () => {
    localStorage.removeItem('dost_stickers_user_defaults');
    localStorage.removeItem('dost_custom_stickers_user_defaults');
    setHasSavedDefault(false);
  };

  const handleResetBoard = () => {
    let targetSettings;
    let targetImages;

    const savedStickersDefaults = localStorage.getItem('dost_stickers_user_defaults');
    const savedCustomImagesDefaults = localStorage.getItem('dost_custom_stickers_user_defaults');

    if (savedStickersDefaults && savedCustomImagesDefaults) {
      try {
        targetSettings = JSON.parse(savedStickersDefaults);
        targetImages = JSON.parse(savedCustomImagesDefaults);
      } catch (err) {
        console.error("Failed to parse custom defaults:", err);
      }
    }

    if (!targetSettings || !targetImages) {
      targetSettings = LOCKED_STICKERS;
      targetImages = LOCKED_CUSTOM_IMAGES;
    }

    setStickers(targetSettings);
    setCustomImages(targetImages);
    setSelectedSticker('alien');
    localStorage.setItem('dost_stickers_v7', JSON.stringify(targetSettings));
    localStorage.setItem('dost_custom_stickers_v3', JSON.stringify(targetImages));
  };

  return (
    <StickerContext.Provider value={{
      isMoveMode,
      setIsMoveMode,
      selectedSticker,
      setSelectedSticker,
      stickers,
      customImages,
      setCustomImages,
      handleDragEnd,
      handleUpdateStickerSetting,
      handleNudgeSticker,
      handleResetBoard,
      stickerNames,
      isMobile,
      isTablet,
      handleSaveBoardAsDefault,
      handleClearBoardDefault,
      hasSavedDefault
    }}>
      {children}
    </StickerContext.Provider>
  );
}

export function useStickers() {
  const context = useContext(StickerContext);
  if (context === undefined) {
    throw new Error('useStickers must be used within a StickerProvider');
  }
  return context;
}

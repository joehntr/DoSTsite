/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ASSETS } from './data';
import IndexCard from './components/IndexCard';
import WorkGallery from './components/WorkGallery';
import AboutFolders from './components/AboutFolders';
import ContactSection from './components/ContactSection';
import ShopComingSoon from './components/ShopComingSoon';
import { StickerProvider } from './context/StickerContext';
import { ProjectProvider } from './context/ProjectContext';
import FloatingStickerControl from './components/FloatingStickerControl';
import FloatingIllustrationControl from './components/FloatingIllustrationControl';

export default function App() {
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ProjectProvider>
      <StickerProvider>
        <div className="min-h-screen bg-[#fbfbf9] text-stone-900 selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden relative flex flex-col justify-between">
        
        {/* 1. BRAND HEADER SECTION */}
      <header className="pt-10 pb-4 px-4 flex flex-col items-center select-none text-center">
        {/* Heraldic Shield Crest Logo */}
        <div className="mb-3 hover:scale-105 transition-transform duration-300">
          <img
            src={ASSETS.logo}
            alt="The Department of Strange Things Official Logo"
            className="w-16 h-16 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Site Name (Clean, Bold Sans Serif Style) */}
        <h1 className="font-sans font-black text-xl tracking-[0.18em] uppercase leading-snug text-neutral-900 inline-block">
          THE DEPT. OF
          <span className="block text-xl tracking-[0.12em] font-black leading-none mt-0.5 text-neutral-900">STRANGE THINGS</span>
        </h1>

        {/* Navigation Menu */}
        <nav className="mt-8 flex items-center justify-center gap-6 text-xs font-mono font-black tracking-wider uppercase text-zinc-950">
          <button
            onClick={() => handleScrollTo('work')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
            id="nav_work_btn"
          >
            WORK
          </button>
          
          <button
            onClick={() => handleScrollTo('about')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
            id="nav_about_btn"
          >
            ABOUT
          </button>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
            id="nav_contact_btn"
          >
            CONTACT
          </button>

          {/* Styled Border Shop Button (Disabled & Stamp Added) */}
          <div className="relative">
            <button
              disabled
              className="px-4 py-1.5 rounded bg-stone-200 text-stone-400 border border-stone-300 font-mono font-black select-none cursor-not-allowed opacity-80"
              id="nav_shop_btn"
            >
              SHOP
            </button>
            <div className="absolute -top-3 -right-3 px-1 py-0.5 bg-white border-2 border-red-600 text-red-600 font-sans font-black text-[7px] uppercase tracking-widest rounded rotate-12 shadow-[2px_2px_0_0_rgba(220,38,38,0.2)] select-none pointer-events-none">
              COMING SOON
            </div>
          </div>
        </nav>
      </header>

      {/* 2. PAGE CONTENT SECTIONS */}
      <main className="flex-1 overflow-visible">
        {/* Intro section (Index card gridlined notebook & sticky notes with stickers) */}
        <IndexCard />

        {/* Gallery section (3 Column Masonry display) */}
        <WorkGallery />

        {/* About folders section (Dual multi tab reveal folder blocks) */}
        <AboutFolders />

        {/* Contact section (Thick lined rigid comic grids and social links) */}
        <ContactSection />
      </main>

      {/* 3. CLASSIFIED BRUTALIST FLOATING FOOTER */}
      <footer className="max-w-none w-auto mx-4 md:mx-12 mt-16 mb-12 select-none">
        <div className="bg-white border-4 border-black overflow-hidden font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch text-stone-900">
            
            {/* Footer Division 1: Crest & Two-line Title (Columns 1-5 on tablet, 1-3 on desktop) */}
            <div className="md:col-span-5 lg:col-span-3 p-6 flex items-center gap-4 border-b-4 md:border-b-0 md:border-r-4 border-black">
              <div className="shrink-0">
                <img
                  src={ASSETS.logo}
                  alt="Mini Shield Logo"
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="leading-tight text-left font-sans font-black uppercase tracking-[0.15em] text-neutral-900">
                <div>THE DEPARTMENT</div>
                <div className="text-[11px] sm:text-xs tracking-[0.08em] font-black leading-none mt-1">
                  OF STRANGE THINGS
                </div>
              </div>
            </div>

            {/* Footer Division 2: Copyright Credentials in Typewriter Font (Columns 6-10 on tablet, 4-10 on desktop) */}
            <div className="md:col-span-5 lg:col-span-7 p-6 flex items-center justify-center md:justify-end text-right border-b-4 md:border-b-0 md:border-r-4 border-black font-typewriter">
              <span className="font-semibold tracking-tight text-[11px] text-neutral-800">
                © JOSEPH HUNTER 2025
              </span>
            </div>

            {/* Footer Division 3: STAY STRANGE Centered Badge (Columns 11-12 on tablet and desktop) */}
            <div className="md:col-span-2 lg:col-span-2 bg-black text-white p-6 flex items-center justify-center hover:bg-rose-600 transition-colors duration-300 cursor-pointer">
              <div className="text-center font-display leading-none">
                <div className="text-xl tracking-widest font-black">D.ST</div>
                <div className="text-[9px] uppercase tracking-widest font-black text-zinc-300 mt-1">
                  STAY STRANGE
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 4. DRAWER SHOP COMPONENT */}
      <ShopComingSoon isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />

      {/* 5. CONDITIONALLY RENDER STUDIOS ONLY IN DEVELOPER SITES OR WITH ?studio=true */}
      {(() => {
        const showStudios = typeof window !== 'undefined' && (
          new URLSearchParams(window.location.search).get('studio') === 'true' ||
          window.location.hostname.includes('localhost') ||
          window.location.hostname.includes('127.0.0.1') ||
          window.location.hostname.includes('ais-dev') ||
          window.location.hostname.includes('ais-pre')
        );
        if (!showStudios) return null;
        return (
          <>
            {/* FLOATING STICKER CONTROL PANEL */}
            <FloatingStickerControl />

            {/* FLOATING ILLUSTRATION CONTROL PANEL */}
            <FloatingIllustrationControl />
          </>
        );
      })()}
    </div>
    </StickerProvider>
    </ProjectProvider>
  );
}

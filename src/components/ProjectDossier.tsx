/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDossierProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset the carousel view index back to zero when another project details view is toggled
  useEffect(() => {
    setCurrentIndex(0);
  }, [project?.id]);

  if (!project) return null;

  // Derive the active list of images (use the custom multi-images if defined and enabled, otherwise fallback to standard single image)
  const imagesList = project.isMultiImage && project.images && project.images.length > 0
    ? project.images
    : [project.image];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const currentImageUrl = imagesList[currentIndex] || project.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-8" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity cursor-pointer"
        />

        {/* Modal Outer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl bg-white rounded-lg p-6 sm:p-8 select-text overflow-hidden z-10 custom-shadow-sticker flex flex-col gap-6"
        >
          {/* Close button in top-right corner of the white box */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 transition-colors duration-200 hover:bg-stone-100 rounded-full cursor-pointer z-20"
            aria-label="Close Dossier"
            id="close_dossier_btn"
          >
            <X size={20} />
          </button>

          {/* Title above - Same style as Work Header but centered */}
          <div className="text-center w-full select-none pr-8">
            <h2 className="font-sans font-black text-lg sm:text-xl tracking-[0.18em] uppercase leading-snug text-neutral-900 inline-block">
              {project.title}
            </h2>
          </div>

          {/* Large image / Carousel view in the middle */}
          <div className="relative w-full flex justify-center items-center overflow-hidden rounded bg-stone-50 min-h-[300px] py-4 group">
            
            {/* Left Nav Button */}
            {project.isMultiImage && imagesList.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 p-2 rounded-full bg-white/90 hover:bg-rose-500 text-stone-900 hover:text-white transition-all cursor-pointer z-10"
                aria-label="Previous gallery image"
                id="carousel_prev_btn"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Current Active Image in View */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={currentImageUrl}
              alt={`${project.title} - View ${currentIndex + 1}`}
              className="max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] w-auto max-w-full object-contain rounded"
              referrerPolicy="no-referrer"
            />

            {/* Right Nav Button */}
            {project.isMultiImage && imagesList.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 p-2 rounded-full bg-white/90 hover:bg-rose-500 text-stone-900 hover:text-white transition-all cursor-pointer z-10"
                aria-label="Next gallery image"
                id="carousel_next_btn"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Dots representation underneath the primary view */}
          {project.isMultiImage && imagesList.length > 1 && (
            <div className="flex justify-center items-center gap-2.5 mt-1 select-none">
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-stone-900 scale-105'
                      : 'bg-transparent hover:bg-stone-200'
                  }`}
                  aria-label={`Show gallery image ${idx + 1}`}
                  id={`carousel_dot_btn_${idx}`}
                />
              ))}
            </div>
          )}

          {/* Space below for a small description */}
          {project.description && (
            <div className="text-center max-w-3xl mx-auto px-4 mt-2">
              <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

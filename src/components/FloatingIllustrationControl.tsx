/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../context/ProjectContext';
import { Settings, X, ChevronUp, ChevronDown, Image as ImageIcon, Sparkles, Undo2, LayoutGrid, FileText, FileCode, Copy } from 'lucide-react';

// Read all image assets inside the images folder dynamically
const imageModules = (import.meta as any).glob('/src/assets/images/*', { eager: true });
const AVAILABLE_GALLERY_IMAGES = Object.entries(imageModules)
  .map(([path, mod]: any) => {
    const filename = path.split('/').pop() || '';
    const resolvedUrl = mod.default || mod;
    return {
      path,
      filename,
      url: resolvedUrl,
    };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename));

export default function FloatingIllustrationControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('out-01');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    projects,
    updateProjectDetails,
    moveProjectToColumn,
    reorderProject,
    resetProjects
  } = useProjects();

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const generateProjectsCode = () => {
    const serialized = projects.map(p => {
      // Strip out the column/order fields as they belong to LOCKED_PROJECT_MAPPING
      const { column, order, ...cleanProj } = p;
      
      // Ensure image urls do not start with a leading slash so they work on GitHub Pages subfolder directories
      if (cleanProj.image && cleanProj.image.startsWith('/')) {
        cleanProj.image = cleanProj.image.substring(1);
      }
      if (cleanProj.images) {
        cleanProj.images = cleanProj.images.map(img => img.startsWith('/') ? img.substring(1) : img);
      }
      return cleanProj;
    });

    return `export const PROJECTS: Project[] = ${JSON.stringify(serialized, null, 2)};`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono select-none pointer-events-auto text-stone-900">
      <AnimatePresence>
        {/* Expanded Controls Card */}
        {isOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 sm:w-96 bg-white border-2 border-stone-900 rounded-lg shadow-[6px_6px_0_0_rgba(28,25,23,1)] overflow-hidden mb-3"
          >
            {/* Header Banner */}
            <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between border-b-2 border-stone-100">
              <div className="flex items-center gap-2">
                <LayoutGrid size={16} className="text-rose-400 animate-pulse" />
                <span className="font-sans font-black text-xs uppercase tracking-widest">
                  ILLUSTRATION STUDIO
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

            {/* Quick reset option */}
            <div className="p-3 border-b border-stone-100 bg-stone-50 flex items-center justify-between gap-3 font-mono">
              <span className="text-[9px] text-stone-500 font-black uppercase tracking-wider">
                CURATE YOUR GALLERY GRID
              </span>
              <button
                onClick={resetProjects}
                className="py-1 px-2.5 bg-white hover:bg-stone-100 border border-stone-300 rounded text-[9px] font-sans font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                title="Restore default gallery items & order"
              >
                <Undo2 size={10} />
                RESET GRID
              </button>
            </div>

            {/* Editing Panel Area */}
            <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto custom-scroll text-left">
              
              {/* Dropdown: Choose Artwork to Customize */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider flex items-center gap-1">
                  <span>1. CHOOSE ILLUSTRATION TO EDIT:</span>
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full text-xs font-mono font-bold py-1.5 px-2.5 bg-white border-2 border-stone-900 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                >
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.title} (Col {proj.column})
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-3">
                {/* Visual Accent Title */}
                <div className="text-[10px] font-bold text-stone-800 uppercase tracking-tight flex items-center gap-1 pb-1 border-b border-stone-100">
                  <Sparkles size={11} className="text-rose-500" />
                  <span>2. CUSTOMIZE TITLE & INFO</span>
                </div>

                {/* Name / Title Form Field */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-stone-400">ILLUSTRATION NAME (TITLE):</span>
                  <input
                    type="text"
                    value={selectedProject.title}
                    onChange={(e) => updateProjectDetails(selectedProject.id, { title: e.target.value })}
                    className="w-full text-xs font-sans font-bold py-1.5 px-2.5 bg-white border border-stone-300 rounded focus:border-stone-900 focus:outline-none"
                    placeholder="Enter Custom Title"
                  />
                </div>

                {/* Description Form Field */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-stone-400">DESCRIPTION COGNITIVE LOG:</span>
                  <textarea
                    value={selectedProject.description}
                    onChange={(e) => updateProjectDetails(selectedProject.id, { description: e.target.value })}
                    className="w-full text-xs font-sans font-normal py-1.5 px-2.5 bg-white border border-stone-300 rounded focus:border-stone-900 focus:outline-none min-h-[50px] max-h-[100px] resize-y"
                    placeholder="Enter brief artwork description"
                  />
                </div>
              </div>

              {/* Grid Placement / Ordering Sections */}
              <div className="border-t border-stone-100 pt-3 space-y-2.5">
                <div className="text-[10px] font-bold text-stone-800 uppercase tracking-tight flex items-center gap-1 pb-1 border-b border-stone-100">
                  <FileText size={11} className="text-zinc-500" />
                  <span>3. POSITION & GRID PLACEMENT</span>
                </div>

                {/* Move Column Segment */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-stone-400">MOVE TO MASONRY COLUMN:</span>
                  <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded font-mono text-[9px] text-center border border-stone-200">
                    {([1, 2, 3] as const).map((colVal) => (
                      <button
                        key={colVal}
                        type="button"
                        onClick={() => moveProjectToColumn(selectedProject.id, colVal)}
                        className={`py-1 rounded cursor-pointer leading-none uppercase font-bold transition-all ${
                          selectedProject.column === colVal
                            ? 'bg-zinc-900 text-white shadow-sm'
                            : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                      >
                        COLUMN {colVal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Order inside Column Button Pair */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-stone-400">RE-ORDER IN CURRENT COLUMN:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => reorderProject(selectedProject.id, 'up')}
                      className="py-1.5 px-3 bg-white hover:bg-stone-100 border border-stone-300 rounded text-[9px] font-sans font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                    >
                      <ChevronUp size={12} className="text-stone-600" />
                      MOVE UP
                    </button>
                    <button
                      type="button"
                      onClick={() => reorderProject(selectedProject.id, 'down')}
                      className="py-1.5 px-3 bg-white hover:bg-stone-100 border border-stone-300 rounded text-[9px] font-sans font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                    >
                      <ChevronDown size={12} className="text-stone-600" />
                      MOVE DOWN
                    </button>
                  </div>
                </div>
              </div>

              {/* Image swapping section */}
              <div className="border-t border-stone-100 pt-3 space-y-2">
                <div className="text-[10px] font-bold text-stone-800 uppercase tracking-tight flex items-center gap-1 pb-1 border-b border-stone-100">
                  <ImageIcon size={11} className="text-zinc-500" />
                  <span>4. CHOOSE IMAGE FILE SOURCE:</span>
                </div>

                <select
                  value={selectedProject.image}
                  onChange={(e) => {
                    const newUrl = e.target.value;
                    const updates: any = { image: newUrl };
                    // If multi-image is active, also update the first slot if appropriate
                    if (selectedProject.isMultiImage && selectedProject.images && selectedProject.images.length > 0) {
                      const nextImages = [...selectedProject.images];
                      nextImages[0] = newUrl;
                      updates.images = nextImages;
                    }
                    updateProjectDetails(selectedProject.id, updates);
                  }}
                  className="w-full text-[11px] font-mono font-black py-1 px-1.5 bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                  id="illustration_image_source_dropdown"
                >
                  {AVAILABLE_GALLERY_IMAGES.map((img) => (
                    <option key={img.path} value={img.url}>
                      {img.filename}
                    </option>
                  ))}
                </select>

                {/* Tiny Image Preview */}
                <div className="mt-1 flex items-center gap-2.5 bg-stone-50 p-2 border border-stone-200 rounded">
                  <div className="w-10 h-10 rounded overflow-hidden bg-white border border-stone-300 shrink-0 flex items-center justify-center">
                    <img
                      src={selectedProject.image}
                      alt="Thumbnail source"
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[8px] text-stone-400 uppercase leading-normal">
                    <div className="font-extrabold text-stone-600 truncate max-w-[200px]">
                      {selectedProject.image.split('/').pop()}
                    </div>
                    <div>Source loaded under assets/images</div>
                  </div>
                </div>
              </div>



            </div>

            {/* GitHub Export / Finalizing Code Option */}
            <div className="p-3 border-t border-stone-200 bg-stone-50">
              <button
                onClick={() => setIsExportOpen(true)}
                className="w-full py-1.5 px-3 bg-amber-50 hover:bg-amber-100 border-2 border-stone-900 text-stone-900 text-[10px] font-sans font-black uppercase rounded shadow-[2px_2px_0_0_rgba(28,25,23,1)] transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(28,25,23,1)] text-center flex items-center justify-center gap-1.5 cursor-pointer"
                title="Export your current illustration information as code to permanently lock content when importing/uploading to GitHub!"
              >
                <FileCode size={12} className="text-amber-600" />
                <span>🔒 LOCK & EXPORT WORK DATA</span>
              </button>
            </div>

            {/* Custom footer */}
            <div className="text-[8px] text-stone-400 font-mono tracking-wider py-2 bg-stone-950 text-white uppercase text-center flex items-center justify-center gap-1">
              <span>DEPT. GRID COMPILER v1.2 // SECURE</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular floating launching button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-950 hover:bg-rose-600 text-white rounded-full border-2 border-stone-900 cursor-pointer shadow-[3px_3px_0_0_rgb(28,25,23)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgb(28,25,23)]"
        id="illustration_designer_trigger_btn"
      >
        <span className="p-0.5 bg-white/10 rounded-full">
          <Settings size={16} className={`text-white ${isOpen ? 'rotate-90' : 'animate-spin-slow'}`} />
        </span>
        <span className="font-sans font-black text-xs uppercase tracking-wider pr-1">
          {isOpen ? 'CLOSE STUDIO' : 'ILLUSTRATION STUDIO'}
        </span>
      </button>

      {/* EXPORT PROJECTS DIALOG MODAL */}
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
                    PROJECT DATA FREEZER PANEL
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
                  📌 How to Save/Freeze Your Work Descriptions & Image URLs:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-stone-700 font-sans">
                  <li>Edit your project names, descriptions, and custom images in this studio.</li>
                  <li>Click <b className="font-black text-stone-900">"Copy Projects Code"</b> below.</li>
                  <li>In your file explorer, open <code className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded font-mono font-bold text-stone-900">/src/data.ts</code>.</li>
                  <li>Locate <code className="font-bold">export const PROJECTS: Project[] = [ ... ];</code> and overwrite that entire array by pasting this code.</li>
                  <li><b>Done!</b> This locks your custom names, descriptions, and relative paths so they display perfectly on GitHub Pages globally for everyone!</li>
                </ol>
              </div>

              {/* Codegen Area */}
              <div className="p-4 space-y-3">
                <textarea
                  readOnly
                  value={generateProjectsCode()}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  className="w-full h-64 px-3 py-2 bg-stone-50 border-2 border-stone-900 rounded font-mono text-[9px] leading-relaxed select-all focus:outline-none custom-scroll resize-none text-left"
                />

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[9px] text-stone-500 font-sans italic text-left max-w-[240px] leading-tight">
                    This captures active titles, logs, customized image slots, and carousel selections with safe relative paths.
                  </span>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateProjectsCode());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    }}
                    className={`px-4 py-2 text-[10px] font-sans font-black uppercase tracking-wider rounded border-2 border-stone-900 shadow-[3px_3px_0_0_rgba(28,25,23,1)] hover:bg-stone-100 cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgba(28,25,23,1)] flex items-center gap-1.5 ${
                      copied ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-white text-stone-900'
                    }`}
                  >
                    <Copy size={12} />
                    <span>{copied ? '✅ COPIED!' : 'COPY PROJECTS CODE'}</span>
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from '../types';
import ProjectDossier from './ProjectDossier';
import { useProjects } from '../context/ProjectContext';

export default function WorkGallery() {
  const { projects } = useProjects();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  // Split projects dynamically into the 3-column configuration based on stateful categories and custom ordering
  const col1Projects = projects
    .filter(p => p.column === 1)
    .sort((a, b) => a.order - b.order);

  const col2Projects = projects
    .filter(p => p.column === 2)
    .sort((a, b) => a.order - b.order);

  const col3Projects = projects
    .filter(p => p.column === 3)
    .sort((a, b) => a.order - b.order);

  const handleOpenDossier = (project: Project) => {
    setActiveProjectId(project.id);
  };

  const handleCloseDossier = () => {
    setActiveProjectId(null);
  };

  // Reusable card renderer matching the hover zoom, tint, title reveal specifications
  const GalleryCard = ({ project }: { project: Project; key?: string }) => {
    return (
      <button
        onClick={() => handleOpenDossier(project)}
        className="w-full text-left relative overflow-hidden bg-stone-50 rounded group hover:-translate-y-1 transition-all duration-300 pointer-events-auto block cursor-pointer"
        aria-label={`Open project page for ${project.title}`}
        id={`gallery_card_btn_${project.id}`}
      >
        {/* Gallery Image: starts colourful, subtle scale zoom on hover */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto block transition-transform duration-500 scale-100 ease-out group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Hover overlay: purple overlay with the title centered in the middle */}
        <div className="absolute inset-0 bg-purple-950/0 group-hover:bg-purple-900/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <h4 className="font-sans font-black text-sm md:text-base text-white tracking-widest uppercase leading-tight select-none">
              {project.title}
            </h4>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section id="work" className="max-w-6xl mx-auto px-4 py-16">
      {/* Title */}
      <div className="text-center mb-10 select-none">
        <h2 className="font-sans font-black text-xl tracking-[0.18em] uppercase leading-snug text-neutral-900 inline-block">
          WORK
        </h2>
      </div>

      {/* Masonry Layout: 3 Columns placed close together */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {col1Projects.map(project => (
            <GalleryCard key={project.id} project={project} />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          {col2Projects.map(project => (
            <GalleryCard key={project.id} project={project} />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          {col3Projects.map(project => (
            <GalleryCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Pop-up Dossier Case File */}
      <ProjectDossier project={activeProject} onClose={handleCloseDossier} />
    </section>
  );
}

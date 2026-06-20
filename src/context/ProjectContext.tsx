/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { LOCKED_PROJECT_MAPPING } from '../lockedLayout';

export interface StatefulProject extends Project {
  column: 1 | 2 | 3;
  order: number;
}

interface ProjectContextType {
  projects: StatefulProject[];
  updateProjectDetails: (id: string, updates: Partial<StatefulProject>) => void;
  moveProjectToColumn: (id: string, targetCol: 1 | 2 | 3) => void;
  reorderProject: (id: string, direction: 'up' | 'down') => void;
  resetProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<StatefulProject[]>(() => {
    try {
      const saved = localStorage.getItem('dost_projects_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading custom projects:', e);
    }

    // Default configuration corresponding to the beautiful 3-column masonry grid loaded from lockedLayout
    return PROJECTS.map((proj) => {
      const lockData = LOCKED_PROJECT_MAPPING.find((lp) => lp.id === proj.id);
      const column = lockData ? lockData.column : 1;
      const order = lockData ? lockData.order : 0;

      const isMagicFingers = proj.title.toLowerCase().includes('magic fingers');

      return {
        ...proj,
        column,
        order,
        isMultiImage: isMagicFingers ? true : undefined,
        images: isMagicFingers ? [proj.image, 'src/assets/images/Project4.png', 'src/assets/images/Project6.png'] : undefined,
      };
    });
  });

  // Save changes whenever state shifts
  useEffect(() => {
    try {
      localStorage.setItem('dost_projects_v2', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects state:', e);
    }
  }, [projects]);

  // Update specific details like title, description, or image URL
  const updateProjectDetails = (id: string, updates: Partial<StatefulProject>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newProject = { ...p, ...updates };
          // Auto detect naming shift to "Magic Fingers" to trigger multi-image default setup
          if (
            updates.title &&
            updates.title.toLowerCase().includes('magic fingers') &&
            (!p.title || !p.title.toLowerCase().includes('magic fingers'))
          ) {
            newProject.isMultiImage = true;
            if (!newProject.images || newProject.images.length === 0) {
              newProject.images = [
                newProject.image,
                'src/assets/images/Project4.png',
                'src/assets/images/Project6.png'
              ];
            }
          }
          return newProject;
        }
        return p;
      })
    );
  };

  // Move a project to a new column (appended to the bottom of that column)
  const moveProjectToColumn = (id: string, targetCol: 1 | 2 | 3) => {
    setProjects((prev) => {
      const targetProj = prev.find((p) => p.id === id);
      if (!targetProj) return prev;
      if (targetProj.column === targetCol) return prev;

      // Filter other projects in the source column and pack their orders
      const sourceCol = targetProj.column;
      const sourceProjectsFiltered = prev
        .filter((p) => p.id !== id && p.column === sourceCol)
        .sort((a, b) => a.order - b.order)
        .map((p, idx) => ({ ...p, order: idx }));

      // Find current max order in target column to place the project at the end
      const targetProjects = prev
        .filter((p) => p.column === targetCol)
        .sort((a, b) => a.order - b.order);
      
      const newOrder = targetProjects.length;

      // Rebuild the projects array
      const untouchedProjects = prev.filter(
        (p) => p.column !== sourceCol && p.column !== targetCol
      );

      const updatedTargetProj = { ...targetProj, column: targetCol, order: newOrder };

      return [
        ...untouchedProjects,
        ...sourceProjectsFiltered,
        ...targetProjects,
        updatedTargetProj,
      ];
    });
  };

  // Bump the project up or down within its column channel
  const reorderProject = (id: string, direction: 'up' | 'down') => {
    setProjects((prev) => {
      const targetProj = prev.find((p) => p.id === id);
      if (!targetProj) return prev;

      const col = targetProj.column;
      // Get all projects in this column sorted by order
      const colProjects = prev
        .filter((p) => p.column === col)
        .sort((a, b) => a.order - b.order);

      const currentIndex = colProjects.findIndex((p) => p.id === id);

      if (direction === 'up' && currentIndex > 0) {
        // Swap with the previous element
        const prevProj = colProjects[currentIndex - 1];
        const prevOrder = prevProj.order;
        const currentOrder = targetProj.order;

        return prev.map((p) => {
          if (p.id === id) {
            return { ...p, order: prevOrder };
          }
          if (p.id === prevProj.id) {
            return { ...p, order: currentOrder };
          }
          return p;
        });
      } else if (direction === 'down' && currentIndex < colProjects.length - 1) {
        // Swap with the next element
        const nextProj = colProjects[currentIndex + 1];
        const nextOrder = nextProj.order;
        const currentOrder = targetProj.order;

        return prev.map((p) => {
          if (p.id === id) {
            return { ...p, order: nextOrder };
          }
          if (p.id === nextProj.id) {
            return { ...p, order: currentOrder };
          }
          return p;
        });
      }

      return prev;
    });
  };

  // Revert all structural and textual edits to the pristine starter state
  const resetProjects = () => {
    const freshDefaults = PROJECTS.map((proj) => {
      const lockData = LOCKED_PROJECT_MAPPING.find((lp) => lp.id === proj.id);
      const column = lockData ? lockData.column : 1;
      const order = lockData ? lockData.order : 0;

      return {
        ...proj,
        column,
        order,
      };
    });

    setProjects(freshDefaults);
    localStorage.removeItem('dost_projects_v2');
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        updateProjectDetails,
        moveProjectToColumn,
        reorderProject,
        resetProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}

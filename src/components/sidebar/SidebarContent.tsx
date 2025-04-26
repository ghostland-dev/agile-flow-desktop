
import React from 'react';
import { ProjectList } from './ProjectList';
import { SidebarHeader } from './SidebarHeader';
import { SidebarSearch } from './SidebarSearch';
import { SidebarNavigation } from './SidebarNavigation';
import { Project } from '@/types/project';

interface SidebarContentProps {
  projects: Project[];
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function SidebarContent({
  projects,
  onNewProject,
  onEditProject,
  onDeleteProject,
}: SidebarContentProps) {
  return (
    <div className="flex-1 px-3 py-4 overflow-y-auto">
      <SidebarHeader />
      <SidebarSearch />
      <SidebarNavigation />
      <ProjectList
        projects={projects}
        onNewProject={onNewProject}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
    </div>
  );
}

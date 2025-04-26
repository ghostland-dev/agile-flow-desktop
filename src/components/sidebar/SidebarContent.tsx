
import React from 'react';
import { ProjectList } from './ProjectList';
import { SidebarHeader } from './SidebarHeader';
import { SidebarSearch } from './SidebarSearch';
import { SidebarNavigation } from './SidebarNavigation';
import { Project } from '@/types/project';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
    <div className="flex flex-col h-full">
      <div className="px-3 py-4">
        <SidebarHeader />
        <SidebarSearch />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-3 pb-4">
          <SidebarNavigation />
          <Separator className="my-4" />
          <ProjectList
            projects={projects}
            onNewProject={onNewProject}
            onEditProject={onEditProject}
            onDeleteProject={onDeleteProject}
          />
        </div>
      </ScrollArea>
      
      <div className="px-3 py-2 mt-auto border-t border-sidebar-border">
        <div className="flex items-center justify-center">
          <a 
            href="https://docs.example.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            Help & Documentation
          </a>
        </div>
      </div>
    </div>
  );
}

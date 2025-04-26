
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { FileText, Search, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { MainMenu } from './sidebar/MainMenu';
import { ProjectList } from './sidebar/ProjectList';
import { ProjectDialogs } from './sidebar/ProjectDialogs';

export function Sidebar() {
  const location = useLocation();
  const { projects, deleteProject } = useProject();
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-60 bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <div className="px-3 py-4">
        <div className="flex items-center px-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-xl text-white">ProjectFlow</h1>
          </div>
        </div>
        
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full py-2 pl-8 pr-3 bg-sidebar-accent text-sidebar-foreground rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <MainMenu />
        
        <ProjectList
          projects={projects}
          onNewProject={() => setNewProjectDialogOpen(true)}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
      
      <div className="mt-auto px-3 py-4 border-t border-sidebar-border">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
            location.pathname === "/settings"
              ? "bg-primary/20 text-primary-foreground font-medium" 
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          )}
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>

      <ProjectDialogs
        newProjectDialog={newProjectDialogOpen}
        editProjectDialog={editProjectDialogOpen}
        deleteDialog={deleteDialogOpen}
        selectedProject={selectedProject}
        onNewProjectClose={() => setNewProjectDialogOpen(false)}
        onEditProjectClose={() => setEditProjectDialogOpen(false)}
        onDeleteDialogClose={() => setDeleteDialogOpen(false)}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}

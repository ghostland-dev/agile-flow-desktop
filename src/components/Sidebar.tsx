
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectList } from './sidebar/ProjectList';
import { ProjectDialogs } from './sidebar/ProjectDialogs';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarSearch } from './sidebar/SidebarSearch';
import { SidebarNavigation } from './sidebar/SidebarNavigation';

export function Sidebar() {
  const location = useLocation();
  const { projects, deleteProject } = useProject();
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (project) => {
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
        <SidebarHeader />
        <SidebarSearch />
        <SidebarNavigation />
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

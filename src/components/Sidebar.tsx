
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { ProjectList } from './sidebar/ProjectList';
import { ProjectDialogs } from './sidebar/ProjectDialogs';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarSearch } from './sidebar/SidebarSearch';
import { SidebarNavigation } from './sidebar/SidebarNavigation';

export function Sidebar() {
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
      <div className="flex-1 px-3 py-4 overflow-y-auto">
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

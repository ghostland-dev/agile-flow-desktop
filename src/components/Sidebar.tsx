
import React from 'react';
import { ProjectDialogs } from './sidebar/ProjectDialogs';
import { SidebarContent } from './sidebar/SidebarContent';
import { useProjectManagement } from '../hooks/useProjectManagement';

export function Sidebar() {
  const {
    projects,
    selectedProject,
    dialogState,
    dialogActions,
    projectActions,
  } = useProjectManagement();

  return (
    <div className="flex flex-col h-full w-60 bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <SidebarContent
        projects={projects}
        onNewProject={() => dialogActions.setNewProjectDialogOpen(true)}
        onEditProject={projectActions.handleEditProject}
        onDeleteProject={projectActions.handleDeleteProject}
      />

      <ProjectDialogs
        newProjectDialog={dialogState.newProjectDialogOpen}
        editProjectDialog={dialogState.editProjectDialogOpen}
        deleteDialog={dialogState.deleteDialogOpen}
        selectedProject={selectedProject}
        onNewProjectClose={() => dialogActions.setNewProjectDialogOpen(false)}
        onEditProjectClose={() => dialogActions.setEditProjectDialogOpen(false)}
        onDeleteDialogClose={() => dialogActions.setDeleteDialogOpen(false)}
        onConfirmDelete={projectActions.confirmDelete}
      />
    </div>
  );
}


import { useState } from 'react';
import { useProject } from './useProject';
import { Project } from '@/types/project';

export function useProjectManagement() {
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

  return {
    projects,
    selectedProject,
    dialogState: {
      newProjectDialogOpen,
      editProjectDialogOpen,
      deleteDialogOpen,
    },
    dialogActions: {
      setNewProjectDialogOpen,
      setEditProjectDialogOpen,
      setDeleteDialogOpen,
    },
    projectActions: {
      handleEditProject,
      handleDeleteProject,
      confirmDelete,
    },
  };
}

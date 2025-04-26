
import React from 'react';
import { Project } from '@/types/project';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { NewProjectForm } from '@/components/dashboard/NewProjectForm';
import { EditProjectForm } from '@/components/dashboard/EditProjectForm';

interface ProjectDialogsProps {
  newProjectDialog: boolean;
  editProjectDialog: boolean;
  deleteDialog: boolean;
  selectedProject: Project | null;
  onNewProjectClose: () => void;
  onEditProjectClose: () => void;
  onDeleteDialogClose: () => void;
  onConfirmDelete: () => void;
}

export function ProjectDialogs({
  newProjectDialog,
  editProjectDialog,
  deleteDialog,
  selectedProject,
  onNewProjectClose,
  onEditProjectClose,
  onDeleteDialogClose,
  onConfirmDelete,
}: ProjectDialogsProps) {
  return (
    <>
      <Dialog open={newProjectDialog} onOpenChange={onNewProjectClose}>
        <DialogContent 
          className="sm:max-w-[425px]"
          aria-describedby="new-project-description"
        >
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription id="new-project-description">
              Create a new project by filling out this form
            </DialogDescription>
          </DialogHeader>
          <NewProjectForm onSuccess={onNewProjectClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={editProjectDialog} onOpenChange={onEditProjectClose}>
        <DialogContent 
          className="sm:max-w-[425px]"
          aria-describedby="edit-project-description"
        >
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription id="edit-project-description">
              Edit the project details
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <EditProjectForm 
              project={selectedProject} 
              onSuccess={onEditProjectClose} 
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialog} onOpenChange={onDeleteDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone
              and all associated tasks will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

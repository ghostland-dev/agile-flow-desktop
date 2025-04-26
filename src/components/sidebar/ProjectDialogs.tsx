
import React from 'react';
import { Project } from '@/types/project';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <NewProjectForm onSuccess={onNewProjectClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={editProjectDialog} onOpenChange={onEditProjectClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
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


import React from 'react';
import { Status } from '@/types/project';
import { NewTaskForm } from '@/components/NewTaskForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface KanbanTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: Status;
  columnTitle: string;
}

export function KanbanTaskDialog({ isOpen, onClose, columnId, columnTitle }: KanbanTaskDialogProps) {
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent aria-describedby={`new-task-${columnId}-description`}>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription id={`new-task-${columnId}-description`}>
            Create a new task in the {columnTitle} column
          </DialogDescription>
        </DialogHeader>
        <NewTaskForm initialStatus={columnId} openInDialog={false} />
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { Task } from '@/types/project';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TaskDeleteConfirmationProps {
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TaskDeleteConfirmation({ task, onConfirm, onCancel }: TaskDeleteConfirmationProps) {
  if (!task) return null;

  return (
    <DialogContent 
      className="sm:max-w-[400px]"
      aria-describedby="delete-task-description" 
    >
      <DialogHeader>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogDescription id="delete-task-description">
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

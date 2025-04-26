
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Status } from '../types/project';
import { useTaskForm } from '../hooks/useTaskForm';
import { TaskFormFields } from './task-form/TaskFormFields';

interface NewTaskFormProps {
  initialStatus?: Status;
  openInDialog?: boolean;
}

export function NewTaskForm({ initialStatus = 'todo', openInDialog = true }: NewTaskFormProps) {
  const [open, setOpen] = useState(false);
  const { formState, setFormState, isSubmitting, handleSubmit } = useTaskForm(initialStatus, () => setOpen(false));
  
  // Create a stable function for updating form state
  const updateFormState = useCallback((newState: React.SetStateAction<typeof formState>) => {
    setFormState(newState);
  }, [setFormState]);
  
  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);
  
  const TaskFormContent = () => (
    <form onSubmit={handleSubmit}>
      <TaskFormFields
        formState={formState}
        setFormState={updateFormState}
        isSubmitting={isSubmitting}
        onCancel={closeDialog}
        showCancel={openInDialog}
      />
    </form>
  );
  
  if (!openInDialog) {
    return <TaskFormContent />;
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription id="new-task-description">
            Create a new task with the details below
          </DialogDescription>
        </DialogHeader>
        <TaskFormContent />
      </DialogContent>
    </Dialog>
  );
}

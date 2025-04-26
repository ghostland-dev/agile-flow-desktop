import React, { useCallback } from 'react';
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
  const [open, setOpen] = React.useState(false);
  const { formState, setFormState, isSubmitting, handleSubmit } = useTaskForm(initialStatus, () => setOpen(false));

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const TaskFormContent = () => (
    <form onSubmit={handleSubmit}>
      <TaskFormFields
        formState={formState}
        setFormState={setFormState}
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
          <DialogDescription>
            Create a new task with the details below
          </DialogDescription>
        </DialogHeader>
        <TaskFormContent />
      </DialogContent>
    </Dialog>
  );
}
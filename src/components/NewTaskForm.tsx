
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Status } from '../types/project';
import { useTaskForm } from '../hooks/useTaskForm';
import { TaskFormFields } from './task-form/TaskFormFields';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer';

interface NewTaskFormProps {
  initialStatus?: Status;
  openInDialog?: boolean;
}

export function NewTaskForm({ initialStatus = 'todo', openInDialog = true }: NewTaskFormProps) {
  const [open, setOpen] = React.useState(false);
  const { formState, setFormState, isSubmitting, handleSubmit } = useTaskForm(initialStatus, () => setOpen(false));
  const drawerDescriptionId = React.useId();

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const TaskFormContent = React.memo(() => (
    <form onSubmit={handleSubmit}>
      <TaskFormFields
        formState={formState}
        setFormState={setFormState}
        isSubmitting={isSubmitting}
        onCancel={closeDrawer}
        showCancel={openInDialog}
      />
    </form>
  ));
  
  TaskFormContent.displayName = 'TaskFormContent';

  if (!openInDialog) {
    return <TaskFormContent />;
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={drawerDescriptionId}>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Add New Task</DrawerTitle>
            <div id={drawerDescriptionId}>
              <DrawerDescription>
                Create a new task with the details below
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <div className="p-4">
            <TaskFormContent />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

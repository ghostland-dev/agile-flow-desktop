
import React, { useCallback, useState } from 'react';
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
  DrawerClose,
} from '@/components/ui/drawer';

// Define TaskFormContent outside of NewTaskForm to prevent re-rendering issues
const TaskFormContent = React.memo(({
  formState,
  setFormState,
  isSubmitting,
  handleSubmit,
  onCancel,
  showCancel
}: {
  formState: any;
  setFormState: any;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  showCancel: boolean;
}) => (
  <form onSubmit={handleSubmit}>
    <TaskFormFields
      formState={formState}
      setFormState={setFormState}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      showCancel={showCancel}
    />
  </form>
));

TaskFormContent.displayName = 'TaskFormContent';

interface NewTaskFormProps {
  initialStatus?: Status;
  openInDialog?: boolean;
}

export function NewTaskForm({ initialStatus = 'todo', openInDialog = true }: NewTaskFormProps) {
  const [open, setOpen] = useState(false);
  
  // Create a stable callback for success that will be stable across renders
  const onSuccess = useCallback(() => setOpen(false), []);
  
  const { formState, setFormState, isSubmitting, handleSubmit } = useTaskForm(initialStatus, onSuccess);
  const drawerDescriptionId = React.useId();

  // Stable function reference to prevent re-renders
  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  if (!openInDialog) {
    return (
      <TaskFormContent
        formState={formState}
        setFormState={setFormState}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onCancel={closeDrawer}
        showCancel={openInDialog}
      />
    );
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
            <DrawerDescription id={drawerDescriptionId}>
              Create a new task with the details below
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <TaskFormContent
              formState={formState}
              setFormState={setFormState}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              onCancel={closeDrawer}
              showCancel={openInDialog}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

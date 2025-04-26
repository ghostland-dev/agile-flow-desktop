
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormState } from '@/hooks/useTaskForm';
import { Label } from '@/components/ui/label';

// Define BasicInfoFields as a top-level component to avoid re-renders
interface BasicInfoFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function BasicInfoFields({ formState, setFormState }: BasicInfoFieldsProps) {
  // Create stable event handlers with useCallback to prevent focus loss
  const handleTitleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormState(prevState => ({ ...prevState, title: newValue }));
  }, [setFormState]);

  const handleDescriptionChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setFormState(prevState => ({ ...prevState, description: newValue }));
  }, [setFormState]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Title</Label>
        <Input 
          id="task-title"
          placeholder="Task title" 
          value={formState.title}
          onChange={handleTitleChange}
          className="text-base"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          placeholder="Description"
          value={formState.description}
          onChange={handleDescriptionChange}
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  );
}

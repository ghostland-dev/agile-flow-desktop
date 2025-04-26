
import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormState } from '@/hooks/useTaskForm';
import { Label } from '@/components/ui/label';

interface BasicInfoFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function BasicInfoFields({ formState, setFormState }: BasicInfoFieldsProps) {
  // Use stable callback references to prevent re-renders and focus loss
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormState(prevState => ({ ...prevState, title: newValue }));
  }, [setFormState]);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

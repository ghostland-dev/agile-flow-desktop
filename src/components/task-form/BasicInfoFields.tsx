
import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormState } from '@/hooks/useTaskForm';

interface BasicInfoFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function BasicInfoFields({ formState, setFormState }: BasicInfoFieldsProps) {
  // Optimize with memoized handlers that only update specific fields
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
        <Input 
          placeholder="Task title" 
          value={formState.title}
          onChange={handleTitleChange}
          className="text-base"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
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

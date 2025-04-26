
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormState } from '@/hooks/useTaskForm';

interface BasicInfoFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function BasicInfoFields({ formState, setFormState }: BasicInfoFieldsProps) {
  const handleTitleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, title: e.target.value }));
  }, [setFormState]);

  const handleDescriptionChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prevState) => ({ ...prevState, description: e.target.value }));
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


import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormState } from '@/hooks/useTaskForm';

interface BasicInfoFieldsProps {
  formState: TaskFormState;
  setFormState: (state: TaskFormState) => void;
}

export function BasicInfoFields({ formState, setFormState }: BasicInfoFieldsProps) {
  // Create update handlers to avoid inline function recreation on each render
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, description: e.target.value });
  };

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

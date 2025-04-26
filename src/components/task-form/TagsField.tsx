
import React from 'react';
import { Input } from '@/components/ui/input';
import { TaskFormState } from '@/hooks/useTaskForm';

interface TagsFieldProps {
  formState: TaskFormState;
  setFormState: (state: TaskFormState) => void;
}

export function TagsField({ formState, setFormState }: TagsFieldProps) {
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, tags: e.target.value });
  };

  return (
    <div>
      <label className="text-sm font-medium">Tags (separated by commas)</label>
      <Input 
        placeholder="design, frontend, urgent" 
        value={formState.tags}
        onChange={handleTagsChange}
      />
    </div>
  );
}

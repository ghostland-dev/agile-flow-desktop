
import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { TaskFormState } from '@/hooks/useTaskForm';

interface TagsFieldProps {
  formState: TaskFormState;
  setFormState: (state: TaskFormState) => void;
}

export function TagsField({ formState, setFormState }: TagsFieldProps) {
  const handleTagsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, tags: e.target.value }));
  }, [setFormState]);

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

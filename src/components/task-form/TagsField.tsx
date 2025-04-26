
import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { TaskFormState } from '@/hooks/useTaskForm';
import { Label } from '@/components/ui/label';

interface TagsFieldProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function TagsField({ formState, setFormState }: TagsFieldProps) {
  // Stable callback to prevent focus issues
  const handleTagsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormState(prevState => ({ ...prevState, tags: newValue }));
  }, [setFormState]);

  return (
    <div className="space-y-2">
      <Label htmlFor="task-tags">Tags (separated by commas)</Label>
      <Input 
        id="task-tags"
        placeholder="design, frontend, urgent" 
        value={formState.tags || ''}
        onChange={handleTagsChange}
      />
    </div>
  );
}

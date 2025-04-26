
import React from 'react';
import { Input } from '@/components/ui/input';
import { TaskFormState } from '@/hooks/useTaskForm';
import { Label } from '@/components/ui/label';

// Define TagsField as a top-level component to avoid re-renders
interface TagsFieldProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function TagsField({ formState, setFormState }: TagsFieldProps) {
  // Create a stable event handler with useCallback to prevent focus issues
  const handleTagsChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

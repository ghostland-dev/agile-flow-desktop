
import React from 'react';
import { Button } from '@/components/ui/button';
import { TaskFormState } from '@/hooks/useTaskForm';
import { BasicInfoFields } from './BasicInfoFields';
import { StatusPriorityFields } from './StatusPriorityFields';
import { DateAssigneeFields } from './DateAssigneeFields';
import { TagsField } from './TagsField';

interface TaskFormFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
  isSubmitting: boolean;
  onCancel?: () => void;
  showCancel?: boolean;
}

export function TaskFormFields({ 
  formState, 
  setFormState, 
  isSubmitting, 
  onCancel,
  showCancel = true 
}: TaskFormFieldsProps) {
  const handleCancelClick = React.useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  return (
    <div className="space-y-4 mt-2">
      <BasicInfoFields formState={formState} setFormState={setFormState} />
      <StatusPriorityFields formState={formState} setFormState={setFormState} />
      <DateAssigneeFields formState={formState} setFormState={setFormState} />
      <TagsField formState={formState} setFormState={setFormState} />
      
      <div className="flex justify-end gap-2">
        {showCancel && (
          <Button variant="outline" type="button" onClick={handleCancelClick}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </div>
  );
}

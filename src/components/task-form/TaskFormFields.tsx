
import React, { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { TaskFormState } from '@/hooks/useTaskForm';
import { BasicInfoFields } from './BasicInfoFields';
import { StatusPriorityFields } from './StatusPriorityFields';
import { DateAssigneeFields } from './DateAssigneeFields';
import { TagsField } from './TagsField';

interface TaskFormFieldsProps {
  formState: TaskFormState;
  setFormState: (state: TaskFormState) => void;
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
  // Utiliser une fonction de rappel stable pour mettre à jour l'état du formulaire
  const updateFormState = useCallback((updater: TaskFormState | ((prev: TaskFormState) => TaskFormState)) => {
    if (typeof updater === 'function') {
      setFormState(updater);
    } else {
      setFormState(updater);
    }
  }, [setFormState]);

  // Mémoriser la fonction de gestion d'annulation
  const handleCancelClick = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  return (
    <div className="space-y-4 mt-2">
      <BasicInfoFields formState={formState} setFormState={updateFormState} />
      <StatusPriorityFields formState={formState} setFormState={updateFormState} />
      <DateAssigneeFields formState={formState} setFormState={updateFormState} />
      <TagsField formState={formState} setFormState={updateFormState} />
      
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

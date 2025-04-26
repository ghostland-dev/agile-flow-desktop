
import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFormState } from '@/hooks/useTaskForm';

interface StatusPriorityFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function StatusPriorityFields({ formState, setFormState }: StatusPriorityFieldsProps) {
  const handleStatusChange = useCallback((value: string) => {
    setFormState((prevState) => ({ ...prevState, status: value as any }));
  }, [setFormState]);

  const handlePriorityChange = useCallback((value: string) => {
    setFormState((prevState) => ({ ...prevState, priority: value as any }));
  }, [setFormState]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select 
          value={formState.status} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="backlog">Backlog</SelectItem>
            <SelectItem value="todo">To do</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="in_review">In review</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Priority</label>
        <Select 
          value={formState.priority} 
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

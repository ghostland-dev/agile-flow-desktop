
import { useState } from 'react';
import { Priority, Status } from '../types/project';
import { useProject } from './useProject';
import { useToast } from './use-toast';

export interface TaskFormState {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date | undefined;
  assignee: string | undefined;
  tags: string;
}

export const useTaskForm = (initialStatus: Status = 'todo', onSuccess?: () => void) => {
  const { currentProject, addTask } = useProject();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formState, setFormState] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: 'medium',
    status: initialStatus,
    dueDate: undefined,
    assignee: undefined,
    tags: '',
  });

  const resetForm = () => {
    setFormState({
      title: '',
      description: '',
      priority: 'medium',
      status: initialStatus,
      dueDate: undefined,
      assignee: undefined,
      tags: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !currentProject) {
      toast({
        title: "Missing information",
        description: "Please provide a title for the task",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addTask({
        title: formState.title,
        description: formState.description,
        priority: formState.priority,
        status: formState.status,
        dueDate: formState.dueDate ? formState.dueDate.toISOString() : undefined,
        assignee: formState.assignee,
        project: currentProject.id,
        tags: formState.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        timeTracked: 0,
      });
      
      toast({
        title: "Task created",
        description: "Your task has been successfully created",
      });
      
      resetForm();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    setFormState,
    isSubmitting,
    handleSubmit,
  };
};

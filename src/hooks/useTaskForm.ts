
import { useState, useCallback, useRef } from 'react';
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
  tags: string;  // Store as string for form input, convert to array when saving
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

  const resetForm = useCallback(() => {
    setFormState({
      title: '',
      description: '',
      priority: 'medium',
      status: initialStatus,
      dueDate: undefined,
      assignee: undefined,
      tags: '',
    });
  }, [initialStatus]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fix: Properly trim the title before checking if it's empty
    const trimmedTitle = formState.title.trim();
    
    if (!trimmedTitle || !currentProject) {
      toast({
        title: "Missing information",
        description: trimmedTitle ? "Project information is missing" : "Please provide a title for the task",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert tags string to array
      const tagsArray = formState.tags
        ? formState.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
        : [];
        
      addTask({
        title: trimmedTitle, // Use the trimmed title
        description: formState.description,
        priority: formState.priority,
        status: formState.status,
        dueDate: formState.dueDate ? formState.dueDate.toISOString() : undefined,
        assignee: formState.assignee,
        project: currentProject.id,
        tags: tagsArray,
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
  }, [formState, currentProject, addTask, toast, resetForm, onSuccess]);

  return {
    formState,
    setFormState,
    isSubmitting,
    handleSubmit,
  };
};


import React, { useState } from 'react';
import { Task } from '../types/project';
import { useProject } from '../hooks/useProject';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TaskDetails } from './tasks/TaskDetails';
import { TaskEditor } from './tasks/TaskEditor';
import { TaskDeleteConfirmation } from './tasks/TaskDeleteConfirmation';
import { TaskCard } from './tasks/TaskCard';

interface TasksListProps {
  tasks: Task[];
}

export const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  const { updateTask, deleteTask } = useProject();
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [deleteConfirmTask, setDeleteConfirmTask] = useState<Task | null>(null);
  const [formValues, setFormValues] = useState<Partial<Task> & { tags?: string[] | string }>({});

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setFormValues({
      ...task,
      tags: task.tags || [],
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmTask) {
      deleteTask(deleteConfirmTask.id);
      setDeleteConfirmTask(null);
      toast({
        title: 'Task deleted',
        description: 'The task has been successfully deleted',
      });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && formValues) {
      let tagsArray: string[] = [];
      
      if (Array.isArray(formValues.tags)) {
        tagsArray = formValues.tags;
      } else if (typeof formValues.tags === 'string') {
        tagsArray = formValues.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      } else {
        tagsArray = editingTask.tags;
      }

      updateTask(editingTask.id, {
        ...formValues,
        tags: tagsArray,
      } as Task);

      setEditingTask(null);
      toast({
        title: 'Task updated',
        description: 'The task has been successfully modified',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  if (tasks.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground animate-fade-in">
        No tasks found. Create a new task to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={() => setViewingTask(task)}
          onEdit={() => handleEditClick(task)}
          onDelete={() => setDeleteConfirmTask(task)}
        />
      ))}

      <Dialog open={!!viewingTask} onOpenChange={(open) => !open && setViewingTask(null)}>
        <TaskDetails task={viewingTask} />
      </Dialog>

      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <TaskEditor
          task={editingTask}
          formValues={formValues}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
        />
      </Dialog>

      <Dialog open={!!deleteConfirmTask} onOpenChange={(open) => !open && setDeleteConfirmTask(null)}>
        <TaskDeleteConfirmation
          task={deleteConfirmTask}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirmTask(null)}
        />
      </Dialog>
    </div>
  );
};


import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Task } from '../types/project';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TaskDetails } from './tasks/TaskDetails';
import { TaskEditor } from './tasks/TaskEditor';
import { TaskDeleteConfirmation } from './tasks/TaskDeleteConfirmation';
import { TaskActions } from './tasks/TaskActions';
import { TaskTags } from './tasks/TaskTags';
import { format, isAfter } from 'date-fns';
import { getPriorityClasses, getStatusClasses } from '@/utils/taskStyles';

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return format(date, 'MMM d');
  };

  const isDueSoon = (dateString?: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    return isAfter(date, today) && !isAfter(date, threeDaysLater);
  };

  const isPastDue = (dateString?: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(today, date);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setFormValues({
      ...task,
      tags: task.tags?.join(', ') || '',
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
      const tagsArray = typeof formValues.tags === 'string'
        ? formValues.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : formValues.tags || [];

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
        <div
          key={task.id}
          className="p-4 bg-card border rounded-lg shadow-sm hover:shadow transition-all animate-fade-in hover:translate-y-[-2px]"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-base">{task.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
            </div>
            {task.priority === 'urgent' && (
              <AlertCircle size={16} className="text-red-500 ml-2 flex-shrink-0" />
            )}
          </div>

          <TaskTags tags={task.tags} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-2 border-t border-border/40 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn('font-normal text-xs', getPriorityClasses(task.priority))}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>

              <Badge variant="outline" className={cn('font-normal text-xs', getStatusClasses(task.status))}>
                {task.status === 'todo'
                  ? 'To Do'
                  : task.status === 'in_progress'
                  ? 'In Progress'
                  : task.status === 'in_review'
                  ? 'In Review'
                  : 'Done'}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {task.timeTracked > 0 && (
                <div className="flex items-center text-xs text-gray-600">
                  <Clock size={12} className="mr-1" />
                  {task.timeTracked}m
                </div>
              )}

              {task.dueDate && (
                <div
                  className={cn(
                    'flex items-center text-xs gap-1',
                    isPastDue(task.dueDate)
                      ? 'text-red-600 font-medium'
                      : isDueSoon(task.dueDate)
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  )}
                >
                  <Calendar size={12} />
                  {formatDate(task.dueDate)}
                  {isPastDue(task.dueDate) && ' (overdue)'}
                </div>
              )}

              {task.status === 'done' && (
                <div className="text-green-600 flex items-center text-xs">
                  <CheckCircle size={12} className="mr-1" />
                  Complete
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-border/40 flex justify-end gap-2">
            <TaskActions 
              onView={() => setViewingTask(task)}
              onEdit={() => handleEditClick(task)}
              onDelete={() => setDeleteConfirmTask(task)}
            />
          </div>
        </div>
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

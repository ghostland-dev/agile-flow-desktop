
import React from 'react';
import { Task } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, CheckCircle, Clock } from 'lucide-react';
import { TaskTags } from './TaskTags';
import { TaskActions } from './TaskActions';
import { format, isAfter } from 'date-fns';
import { getPriorityClasses, getStatusClasses } from '@/utils/taskStyles';

interface TaskCardProps {
  task: Task;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onView, onEdit, onDelete }: TaskCardProps) {
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

  return (
    <div className="p-4 bg-card border rounded-lg shadow-sm hover:shadow transition-all animate-fade-in hover:translate-y-[-2px]">
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
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

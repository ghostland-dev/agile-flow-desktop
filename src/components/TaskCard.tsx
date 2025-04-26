
import React from 'react';
import { format, isToday, isYesterday, isTomorrow } from 'date-fns';
import { useProject, Task, Priority } from '../contexts/ProjectContext';
import { AlertCircle, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
}

function formatTimeTracked(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatDueDate(dateString?: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';
  
  return format(date, 'MMM d');
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-sky-100 text-sky-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export function TaskCard({ task }: TaskCardProps) {
  const { users } = useProject();
  const assignee = task.assignee ? users.find(u => u.id === task.assignee) : undefined;
  
  return (
    <div className="task-card bg-white border rounded-lg shadow-sm p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-base">{task.title}</h3>
        {task.priority !== 'low' && (
          <span className={cn("text-xs font-medium rounded-full px-2 py-0.5", priorityColors[task.priority])}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs bg-muted text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
        {assignee ? (
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-1">
              <AvatarImage src={assignee.avatar} />
              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{assignee.name.split(' ')[0]}</span>
          </div>
        ) : (
          <div className="h-6" />
        )}
        
        <div className="flex items-center gap-3">
          {task.timeTracked > 0 && (
            <div className="flex items-center text-xs text-gray-600">
              <Clock size={12} className="mr-1" />
              {formatTimeTracked(task.timeTracked)}
            </div>
          )}
          
          {task.dueDate && (
            <div className={cn(
              "flex items-center text-xs", 
              new Date(task.dueDate) < new Date() ? "text-red-600" : "text-gray-600"
            )}>
              <Calendar size={12} className="mr-1" />
              {formatDueDate(task.dueDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

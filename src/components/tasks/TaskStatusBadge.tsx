
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Status } from '@/types/project';

interface TaskStatusBadgeProps {
  status: Status;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusClasses = (status: Status) => {
    switch(status) {
      case 'done':
        return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'in_progress':
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'in_review':
        return 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("font-normal text-xs", getStatusClasses(status))}
    >
      {status === 'todo' ? 'To Do' : 
       status === 'in_progress' ? 'In Progress' : 
       status === 'in_review' ? 'In Review' : 'Done'}
    </Badge>
  );
}

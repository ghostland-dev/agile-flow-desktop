
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
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
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

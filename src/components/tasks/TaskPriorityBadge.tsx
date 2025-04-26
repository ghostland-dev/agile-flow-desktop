
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Priority } from '@/contexts/ProjectContext';

interface TaskPriorityBadgeProps {
  priority: Priority;
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const getPriorityClasses = (priority: Priority) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("font-normal text-xs", getPriorityClasses(priority))}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}

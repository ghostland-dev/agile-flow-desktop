
import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTimeTracked, formatDueDate, isDueSoon, isPastDue } from '@/utils/dateFormatters';

interface TaskMetadataProps {
  timeTracked: number;
  dueDate?: string;
  status: string;
}

export function TaskMetadata({ timeTracked, dueDate, status }: TaskMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {timeTracked > 0 && (
        <div className="flex items-center text-gray-600 dark:text-gray-400 shrink-0">
          <Clock size={12} className="mr-1 shrink-0" />
          {formatTimeTracked(timeTracked)}
        </div>
      )}
      
      {dueDate && (
        <div className={cn(
          "flex items-center gap-1 shrink-0", 
          isPastDue(dueDate) ? "text-red-600 dark:text-red-400 font-medium" : 
          isDueSoon(dueDate) ? "text-amber-600 dark:text-amber-400" : 
          "text-gray-600 dark:text-gray-400"
        )}>
          <Calendar size={12} className="shrink-0" />
          {formatDueDate(dueDate)}
          {isPastDue(dueDate) && " (overdue)"}
        </div>
      )}
      
      {status === 'done' && (
        <div className="text-green-600 dark:text-green-400 flex items-center shrink-0">
          <CheckCircle size={12} className="mr-1 shrink-0" />
          Complete
        </div>
      )}
    </div>
  );
}


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
    <div className="flex items-center gap-3">
      {timeTracked > 0 && (
        <div className="flex items-center text-xs text-gray-600">
          <Clock size={12} className="mr-1" />
          {formatTimeTracked(timeTracked)}
        </div>
      )}
      
      {dueDate && (
        <div className={cn(
          "flex items-center text-xs gap-1", 
          isPastDue(dueDate) ? "text-red-600 font-medium" : 
          isDueSoon(dueDate) ? "text-amber-600" : 
          "text-gray-600"
        )}>
          <Calendar size={12} />
          {formatDueDate(dueDate)}
          {isPastDue(dueDate) && " (overdue)"}
        </div>
      )}
      
      {status === 'done' && (
        <div className="text-green-600 flex items-center text-xs">
          <CheckCircle size={12} className="mr-1" />
          Complete
        </div>
      )}
    </div>
  );
}

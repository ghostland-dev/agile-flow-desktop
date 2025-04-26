
import React from 'react';
import { Button } from '@/components/ui/button';

interface PriorityFilterProps {
  filterPriority: string | null;
  setFilterPriority: (priority: string | null) => void;
}

export function PriorityFilter({ filterPriority, setFilterPriority }: PriorityFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'urgent' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'urgent' ? null : 'urgent')}
      >
        Urgent
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'high' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'high' ? null : 'high')}
      >
        High
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'medium' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'medium' ? null : 'medium')}
      >
        Medium
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'low' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'low' ? null : 'low')}
      >
        Low
      </Button>
    </div>
  );
}

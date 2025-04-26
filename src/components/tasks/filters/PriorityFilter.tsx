
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
        className={filterPriority === 'urgent' ? 'bg-red-50 text-red-700 border-red-200' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'urgent' ? null : 'urgent')}
      >
        Urgent
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'high' ? null : 'high')}
      >
        High
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'medium' ? null : 'medium')}
      >
        Medium
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={filterPriority === 'low' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''} 
        onClick={() => setFilterPriority(filterPriority === 'low' ? null : 'low')}
      >
        Low
      </Button>
    </div>
  );
}

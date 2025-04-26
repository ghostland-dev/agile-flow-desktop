
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ListFilter } from 'lucide-react';

interface TaskFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPriority: string | null;
  setFilterPriority: (priority: string | null) => void;
  handleResetFilters: () => void;
}

export function TaskFilters({
  searchTerm,
  setSearchTerm,
  filterPriority,
  setFilterPriority,
  handleResetFilters
}: TaskFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-60 pl-9"
        />
      </div>
      {(searchTerm || filterPriority) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetFilters}
        >
          Clear filters
        </Button>
      )}
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
    </div>
  );
}

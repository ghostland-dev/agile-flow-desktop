
import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchFilter } from './filters/SearchFilter';
import { PriorityFilter } from './filters/PriorityFilter';

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
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {(searchTerm || filterPriority) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetFilters}
        >
          Clear filters
        </Button>
      )}
      
      <PriorityFilter 
        filterPriority={filterPriority} 
        setFilterPriority={setFilterPriority} 
      />
    </div>
  );
}

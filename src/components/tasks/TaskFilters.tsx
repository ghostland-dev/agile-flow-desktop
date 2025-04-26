
import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchFilter } from './filters/SearchFilter';
import { PriorityFilter } from './filters/PriorityFilter';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
      <div className="w-full sm:w-auto">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <PriorityFilter 
          filterPriority={filterPriority} 
          setFilterPriority={setFilterPriority} 
        />
      </div>
      
      {(searchTerm || filterPriority) && (
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          onClick={handleResetFilters}
          className="ml-auto"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}

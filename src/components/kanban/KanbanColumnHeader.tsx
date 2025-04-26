
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface KanbanColumnHeaderProps {
  title: string;
  taskCount: number;
  onAddTask: () => void;
}

export function KanbanColumnHeader({ title, taskCount, onAddTask }: KanbanColumnHeaderProps) {
  return (
    <div className="p-3 font-medium text-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>{title}</span>
        <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
          {taskCount}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        className="h-7 w-7 p-0" 
        onClick={onAddTask}
      >
        <Plus size={16} />
        <span className="sr-only">Add task</span>
      </Button>
    </div>
  );
}


import React from 'react';
import { Task } from '@/types/project';
import { TaskCard } from './TaskCard';
import { useProject } from '@/hooks/useProject';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface TaskDraggableProps {
  task: Task;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskDraggable({ task, onView, onEdit, onDelete }: TaskDraggableProps) {
  const { updateTaskStatus } = useProject();
  
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });
  
  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "transition-all cursor-grab",
        isDragging && "opacity-50 scale-105",
        "touch-manipulation"
      )}
    >
      <TaskCard 
        task={task} 
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

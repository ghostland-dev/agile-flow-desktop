
import React from 'react';
import { Task } from '@/types/project';
import { TaskCard } from '@/components/TaskCard';

interface KanbanColumnContentProps {
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function KanbanColumnContent({ tasks, onDragStart }: KanbanColumnContentProps) {
  return (
    <div className="flex-1 p-2 space-y-3 overflow-y-auto">
      {tasks.length === 0 ? (
        <div className="flex items-center justify-center h-20 border border-dashed rounded-md border-muted-foreground/20">
          <p className="text-sm text-muted-foreground">No tasks</p>
        </div>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={e => onDragStart(e, task.id)}
          >
            <TaskCard task={task} />
          </div>
        ))
      )}
    </div>
  );
}

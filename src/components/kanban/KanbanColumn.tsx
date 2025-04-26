
import React from 'react';
import { Status, Task } from '@/types/project';
import { KanbanColumnHeader } from './KanbanColumnHeader';
import { KanbanColumnContent } from './KanbanColumnContent';
import { KanbanTaskDialog } from './KanbanTaskDialog';

interface KanbanColumnProps {
  id: Status;
  title: string;
  tasks: Task[];
  isDialogOpen: boolean;
  onDialogOpen: () => void;
  onDialogClose: () => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Status) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  isDialogOpen,
  onDialogOpen,
  onDialogClose,
  onDragStart,
  onDragOver,
  onDrop
}: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col bg-muted/40 rounded-lg w-72 min-w-[18rem] h-full"
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, id)}
    >
      <KanbanColumnHeader
        title={title}
        taskCount={tasks.length}
        onAddTask={onDialogOpen}
      />
      
      <KanbanColumnContent
        tasks={tasks}
        onDragStart={onDragStart}
      />

      {isDialogOpen && (
        <KanbanTaskDialog
          isOpen={true}
          onClose={onDialogClose}
          columnId={id}
          columnTitle={title}
        />
      )}
    </div>
  );
}


import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Status } from '../types/project';
import { KanbanColumn } from './kanban/KanbanColumn';

export function KanbanBoard() {
  const { tasks, currentProject, updateTaskStatus } = useProject();
  const [isDialogOpen, setIsDialogOpen] = useState<{ [key: string]: boolean }>({});
  
  const columns: { id: Status; title: string }[] = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'in_review', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];
  
  // Filter tasks by current project
  const projectTasks = currentProject
    ? tasks.filter(task => task.project === currentProject.id)
    : [];
  
  // Handle drag events
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    updateTaskStatus(taskId, status);
  };

  const openDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: true }));
  };

  const closeDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: false }));
  };
  
  return (
    <div className="flex gap-4 p-6 h-full overflow-x-auto">
      {columns.map(column => {
        const columnTasks = projectTasks.filter(task => task.status === column.id);
        
        return (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={columnTasks}
            isDialogOpen={!!isDialogOpen[column.id]}
            onDialogOpen={() => openDialog(column.id)}
            onDialogClose={() => closeDialog(column.id)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}

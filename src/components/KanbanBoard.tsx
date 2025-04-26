
import React from 'react';
import { useProject, Status } from '../contexts/ProjectContext';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

export function KanbanBoard() {
  const { tasks, currentProject, updateTaskStatus } = useProject();
  
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
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    updateTaskStatus(taskId, status);
  };
  
  return (
    <div className="flex gap-4 p-6 h-full overflow-x-auto">
      {columns.map(column => {
        const columnTasks = projectTasks.filter(task => task.status === column.id);
        
        return (
          <div
            key={column.id}
            className="flex flex-col bg-muted/40 rounded-lg w-72 min-w-[18rem] h-full"
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, column.id)}
          >
            <div className="p-3 font-medium text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{column.title}</span>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">{columnTasks.length}</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Plus size={16} />
              </button>
            </div>
            
            <div className="flex-1 p-2 space-y-3 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="flex items-center justify-center h-20 border border-dashed rounded-md border-muted-foreground/20">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                </div>
              ) : (
                columnTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={e => handleDragStart(e, task.id)}
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

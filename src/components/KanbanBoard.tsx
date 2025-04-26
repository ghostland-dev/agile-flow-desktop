
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Status } from '../types/project';
import { KanbanColumn } from './kanban/KanbanColumn';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function KanbanBoard() {
  const { tasks, currentProject, updateTaskStatus } = useProject();
  const [isDialogOpen, setIsDialogOpen] = useState<{ [key: string]: boolean }>({});
  const isMobile = useIsMobile();
  
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
    toast.success('Task moved successfully!');
  };

  const openDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: true }));
  };

  const closeDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: false }));
  };
  
  return (
    <div className="h-[calc(100vh-13rem)] w-full">
      <ScrollArea className="h-full w-full">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 p-2 sm:p-4 ${!isMobile && 'min-w-max'} pb-10`}>
          {columns.map(column => {
            const columnTasks = projectTasks.filter(task => task.status === column.id);
            
            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: columns.findIndex(c => c.id === column.id) * 0.1 }}
              >
                <KanbanColumn
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
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

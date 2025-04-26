
import React from 'react';
import { Task } from '@/types/project';
import { TaskCard } from '@/components/tasks/TaskCard';
import { useProject } from '@/hooks/useProject';
import { useToast } from '@/hooks/use-toast';

interface KanbanColumnContentProps {
  tasks: Task[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

export function KanbanColumnContent({ tasks, onDragStart }: KanbanColumnContentProps) {
  const { deleteTask } = useProject();
  const { toast } = useToast();

  const handleViewTask = (taskId: string) => {
    // For now just show a toast - this would typically open a task details view
    toast({
      title: "View Task",
      description: `Viewing task ${taskId}`
    });
  };

  const handleEditTask = (taskId: string) => {
    // For now just show a toast - this would typically open a task edit form
    toast({
      title: "Edit Task",
      description: `Editing task ${taskId}`
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

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
            onDragStart={(e) => onDragStart(e, task.id)}
          >
            <TaskCard 
              task={task} 
              onView={() => handleViewTask(task.id)}
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          </div>
        ))
      )}
    </div>
  );
}

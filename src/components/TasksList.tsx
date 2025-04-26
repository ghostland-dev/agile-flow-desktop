import React from 'react';
import { Task } from '../contexts/ProjectContext';

interface TasksListProps {
  tasks: Task[];
}

export const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="p-3 bg-card border rounded-md shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-medium">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' : 
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-muted-foreground">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

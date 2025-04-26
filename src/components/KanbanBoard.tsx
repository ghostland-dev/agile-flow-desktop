
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Status, Task } from '../types/project';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { NewTaskForm } from './NewTaskForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function KanbanBoard() {
  const { tasks, currentProject, updateTaskStatus } = useProject();
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null);
  
  const columns: { id: Status; title: string }[] = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'in_review', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];
  
  // Filter tasks by current project
  let projectTasks = currentProject
    ? tasks.filter(task => task.project === currentProject.id)
    : [];
  
  // Apply filters
  if (filterPriority) {
    projectTasks = projectTasks.filter(task => task.priority === filterPriority);
  }
  
  if (filterAssignee) {
    projectTasks = projectTasks.filter(task => 
      filterAssignee === 'unassigned' 
        ? !task.assignee 
        : task.assignee === filterAssignee
    );
  }
  
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
  
  // Reset filters
  const resetFilters = () => {
    setFilterPriority(null);
    setFilterAssignee(null);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between bg-background">
        <div className="text-sm">
          {projectTasks.length} {projectTasks.length === 1 ? 'task' : 'tasks'} 
          {(filterPriority || filterAssignee) && (
            <Button 
              variant="link" 
              size="sm" 
              className="ml-2 text-xs p-0 h-auto" 
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Priority {filterPriority ? `: ${filterPriority}` : ''}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterPriority('urgent')}>Urgent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('high')}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('medium')}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('low')}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Assignee {filterAssignee ? `: ${filterAssignee === 'unassigned' ? 'Unassigned' : filterAssignee}` : ''}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterAssignee('unassigned')}>Unassigned</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterAssignee('user-1')}>Alex Johnson</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterAssignee('user-2')}>Sam Chen</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterAssignee('user-3')}>Taylor Williams</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
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
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Plus size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <NewTaskForm />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </div>
  );
}

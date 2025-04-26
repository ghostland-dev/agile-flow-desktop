
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Calendar, Clock, List, Play, Square, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NewTaskForm } from './NewTaskForm';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ProjectHeader() {
  const { currentProject, currentView, setCurrentView, tasks, startTimeTracking, stopTimeTracking } = useProject();
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  
  if (!currentProject) return null;
  
  const views = [
    { id: 'kanban', label: 'Board', icon: <List size={16} /> },
    { id: 'list', label: 'List', icon: <List size={16} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={16} /> },
  ] as const;
  
  const projectTasksInProgress = tasks
    .filter(task => task.project === currentProject.id && task.status === 'in_progress');
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startTimer = (taskId: string) => {
    if (isTracking) {
      stopTimer();
    }
    
    startTimeTracking(taskId);
    setIsTracking(true);
    setCurrentTaskId(taskId);
    setElapsedTime(0);
    
    const interval = window.setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    setTimerInterval(interval);
    
    const task = tasks.find(t => t.id === taskId);
    toast({
      title: "Timer started",
      description: `Tracking time for "${task?.title}"`,
    });
  };
  
  const stopTimer = () => {
    if (currentTaskId) {
      stopTimeTracking(currentTaskId);
      
      if (timerInterval !== null) {
        clearInterval(timerInterval);
      }
      
      setIsTracking(false);
      setTimerInterval(null);
      
      toast({
        title: "Timer stopped",
        description: `Tracked ${formatTime(elapsedTime)}`,
      });
    }
  };
  
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: currentProject.color }}
            />
            <h1 className="font-bold text-2xl">{currentProject.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {isTracking ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
              <Button variant="outline" size="sm" className="gap-1" onClick={stopTimer}>
                <Square size={14} className="text-red-500" />
                Stop Timer
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Play size={14} className="text-green-500" />
                  Start Timer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {projectTasksInProgress.length > 0 ? (
                  projectTasksInProgress.map(task => (
                    <DropdownMenuItem 
                      key={task.id} 
                      onClick={() => startTimer(task.id)}
                      className="cursor-pointer"
                    >
                      {task.title}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No tasks in progress</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <NewTaskForm />
        </div>
      </div>
      
      <div className="flex border-b">
        {views.map((view) => (
          <button
            key={view.id}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-sm border-b-2 transition-colors",
              currentView === view.id
                ? "text-primary border-primary font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted"
            )}
            onClick={() => setCurrentView(view.id)}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>
    </header>
  );
}

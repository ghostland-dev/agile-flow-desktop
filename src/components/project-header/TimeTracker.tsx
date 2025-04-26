
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Timer, Square, Play } from 'lucide-react';
import { useProject } from '@/hooks/useProject';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TimeTracker() {
  const { tasks, currentProject, startTimeTracking, stopTimeTracking } = useProject();
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const projectTasksInProgress = currentProject ? tasks
    .filter(task => task.project === currentProject.id && task.status === 'in_progress') : [];

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
    <>
      {isTracking ? (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-md px-3 py-1.5 animate-pulse">
          <Timer size={16} className="text-red-500" />
          <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50 p-0 px-2" 
            onClick={stopTimer}
          >
            <Square size={14} className="mr-1" />
            Stop
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
    </>
  );
}

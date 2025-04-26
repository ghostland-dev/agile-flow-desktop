
import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Timer, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TaskTimerProps {
  taskId: string;
}

export function TaskTimer({ taskId }: TaskTimerProps) {
  const { timeEntries, startTimeTracking, stopTimeTracking, getTaskTimeEntries } = useProject();
  const { toast } = useToast();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const activeEntry = getTaskTimeEntries(taskId).find(entry => !entry.endTime);
    setIsRunning(!!activeEntry);

    if (activeEntry) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((new Date().getTime() - new Date(activeEntry.startTime).getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [taskId, timeEntries, getTaskTimeEntries]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    startTimeTracking(taskId);
    setIsRunning(true);
    toast({
      title: "Timer Started",
      description: "Time tracking has begun for this task",
    });
  };

  const handleStopTimer = () => {
    stopTimeTracking(taskId);
    setIsRunning(false);
    toast({
      title: "Timer Stopped",
      description: "Time tracking has been stopped",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Timer size={14} className="text-muted-foreground" />
      <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
      {isRunning ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleStopTimer}
        >
          <Square size={14} className="text-red-500" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleStartTimer}
        >
          <Play size={14} className="text-green-500" />
        </Button>
      )}
    </div>
  );
}

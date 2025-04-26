
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useProject } from '../hooks/useProject';
import { Timer, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TaskTimerProps {
  taskId: string;
}

export const TaskTimer = memo(function TaskTimer({ taskId }: TaskTimerProps) {
  const { timeEntries, startTimeTracking, stopTimeTracking, getTaskTimeEntries } = useProject();
  const { toast } = useToast();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Format time for display
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Check if timer is active and set up timer
  useEffect(() => {
    // Clear any existing interval
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const activeEntry = getTaskTimeEntries(taskId).find(entry => !entry.endTime);
    setIsRunning(!!activeEntry);

    if (activeEntry) {
      const startTime = new Date(activeEntry.startTime).getTime();
      
      // Initial elapsed time calculation
      const initialElapsed = Math.floor((new Date().getTime() - startTime) / 1000);
      setElapsedTime(initialElapsed);
      
      // Set up new interval
      const id = window.setInterval(() => {
        const elapsed = Math.floor((new Date().getTime() - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      
      setIntervalId(id);
      
      return () => {
        clearInterval(id);
      };
    }
  }, [taskId, timeEntries, getTaskTimeEntries]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleStartTimer = useCallback(() => {
    startTimeTracking(taskId);
    setIsRunning(true);
    setElapsedTime(0);
    toast({
      title: "Timer Started",
      description: "Time tracking has begun for this task",
    });
  }, [taskId, startTimeTracking, toast]);

  const handleStopTimer = useCallback(() => {
    stopTimeTracking(taskId);
    setIsRunning(false);
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    toast({
      title: "Timer Stopped",
      description: "Time tracking has been stopped",
    });
  }, [taskId, stopTimeTracking, toast, intervalId]);

  return (
    <div className="flex items-center gap-2">
      <Timer size={14} className="text-muted-foreground" />
      <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
      {isRunning ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-red-50 dark:hover:bg-red-900"
          onClick={handleStopTimer}
        >
          <Square size={14} className="text-red-500" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-green-50 dark:hover:bg-green-900"
          onClick={handleStartTimer}
        >
          <Play size={14} className="text-green-500" />
        </Button>
      )}
    </div>
  );
});

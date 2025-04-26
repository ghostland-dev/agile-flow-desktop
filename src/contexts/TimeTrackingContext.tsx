
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TimeEntry, TimeTrackingContextType } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useTaskContext } from './TaskContext';

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined);

export const useTimeTracking = () => {
  const context = useContext(TimeTrackingContext);
  if (!context) throw new Error('useTimeTracking must be used within a TimeTrackingProvider');
  return context;
};

export function TimeTrackingProvider({ children }: { children: React.ReactNode }) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(() => 
    loadFromStorage('timeEntries', [])
  );
  const { updateTask } = useTaskContext();

  // Save time entries to storage when they change
  useEffect(() => {
    saveToStorage('timeEntries', timeEntries);
  }, [timeEntries]);

  // Start time tracking for a task
  const startTimeTracking = useCallback((taskId: string) => {
    // Check if there's already an active timer for this task
    const activeEntry = timeEntries.find(entry => entry.taskId === taskId && !entry.endTime);
    
    // If there's an active timer, don't create another one
    if (activeEntry) return;
    
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: 'current-user',
      startTime: new Date().toISOString(),
      duration: 0
    };
    
    setTimeEntries(prevEntries => [...prevEntries, newEntry]);
  }, [timeEntries]);

  // Stop time tracking for a task
  const stopTimeTracking = useCallback((taskId: string) => {
    const now = new Date();
    
    setTimeEntries(entries => {
      const updatedEntries = entries.map(entry => {
        if (entry.taskId === taskId && !entry.endTime) {
          const startTime = new Date(entry.startTime);
          const durationSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
          
          return {
            ...entry,
            endTime: now.toISOString(),
            duration: durationSeconds
          };
        }
        return entry;
      });
      
      const taskEntries = updatedEntries.filter(entry => entry.taskId === taskId);
      const totalSeconds = taskEntries.reduce((total, entry) => total + entry.duration, 0);
      const totalMinutes = Math.floor(totalSeconds / 60);
      
      // Update task with total time tracked
      setTimeout(() => {
        updateTask(taskId, { timeTracked: totalMinutes });
      }, 0);
      
      return updatedEntries;
    });
  }, [updateTask]);

  // Get time entries for a specific task
  const getTaskTimeEntries = useCallback((taskId: string) => {
    return timeEntries.filter(entry => entry.taskId === taskId);
  }, [timeEntries]);

  return (
    <TimeTrackingContext.Provider value={{
      timeEntries,
      startTimeTracking,
      stopTimeTracking,
      getTaskTimeEntries,
    }}>
      {children}
    </TimeTrackingContext.Provider>
  );
}

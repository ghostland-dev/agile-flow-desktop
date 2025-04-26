
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimeEntry } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useTaskContext } from './TaskContext';

interface TimeTrackingContextType {
  timeEntries: TimeEntry[];
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (taskId: string) => void;
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
}

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

  useEffect(() => {
    saveToStorage('timeEntries', timeEntries);
  }, [timeEntries]);

  const startTimeTracking = (taskId: string) => {
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: 'current-user',
      startTime: new Date().toISOString(),
      duration: 0
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const stopTimeTracking = (taskId: string) => {
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
      
      updateTask(taskId, { timeTracked: totalMinutes });
      
      return updatedEntries;
    });
  };

  const getTaskTimeEntries = (taskId: string) => {
    return timeEntries.filter(entry => entry.taskId === taskId);
  };

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

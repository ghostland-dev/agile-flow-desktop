
import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { useProject } from '../contexts/ProjectContext';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function TimelineView() {
  const { tasks, currentProject } = useProject();

  // Filter tasks for the current project
  const projectTasks = currentProject
    ? tasks.filter(task => task.project === currentProject.id && task.dueDate)
    : [];

  // Generate timeline dates (2 weeks from today)
  const today = new Date();
  const timelineDates = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Timeline header */}
          <div className="flex border-b mb-4">
            <div className="w-48 flex-shrink-0" /> {/* Spacer for task names */}
            {timelineDates.map((date) => (
              <div 
                key={date.toISOString()} 
                className={cn(
                  "flex-1 text-center pb-2",
                  isSameDay(date, today) && "font-semibold text-primary"
                )}
              >
                <div className="text-sm">{format(date, 'EEE')}</div>
                <div className="text-xs text-muted-foreground">{format(date, 'MMM d')}</div>
              </div>
            ))}
          </div>

          {/* Tasks timeline */}
          <div className="space-y-3">
            {projectTasks.map((task) => (
              <div key={task.id} className="flex items-start">
                <div className="w-48 flex-shrink-0 pr-4">
                  <Card className="p-2">
                    <h3 className="text-sm font-medium truncate">{task.title}</h3>
                    <span className={cn(
                      "inline-block px-2 py-0.5 rounded-full text-xs mt-1",
                      task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-sky-100 text-sky-800'
                    )}>
                      {task.priority}
                    </span>
                  </Card>
                </div>
                
                <div className="flex flex-1">
                  {timelineDates.map((date) => {
                    const taskDate = task.dueDate ? new Date(task.dueDate) : null;
                    const isTaskDue = taskDate && isSameDay(date, taskDate);
                    
                    return (
                      <div 
                        key={date.toISOString()} 
                        className={cn(
                          "flex-1 border-r border-b h-12 relative",
                          isSameDay(date, today) && "bg-muted/30"
                        )}
                      >
                        {isTaskDue && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={cn(
                              "w-3 h-3 rounded-full",
                              task.priority === 'urgent' ? 'bg-red-500' :
                              task.priority === 'high' ? 'bg-orange-500' :
                              task.priority === 'medium' ? 'bg-amber-500' :
                              'bg-sky-500'
                            )} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

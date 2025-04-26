
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useProject, Task } from '../contexts/ProjectContext';
import { Card } from '@/components/ui/card';

export function CalendarView() {
  const { tasks, currentProject } = useProject();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Filter tasks for the current project
  const projectTasks = currentProject
    ? tasks.filter(task => task.project === currentProject.id)
    : tasks;

  // Get tasks for the selected date
  const getTasksForDate = (date: Date) => {
    return projectTasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  const selectedDayTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="flex gap-4 p-6 h-full">
      <div className="w-fit bg-white rounded-lg shadow-sm p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border pointer-events-auto"
        />
      </div>

      <div className="flex-1">
        <h2 className="font-semibold mb-4">
          {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
        </h2>
        <div className="space-y-3">
          {selectedDayTasks.length === 0 ? (
            <p className="text-muted-foreground">No tasks scheduled for this date</p>
          ) : (
            selectedDayTasks.map((task) => (
              <Card key={task.id} className="p-4">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-sky-100 text-sky-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

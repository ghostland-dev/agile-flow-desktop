
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useProject, Task } from '../contexts/ProjectContext';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

export function CalendarView() {
  const { tasks, currentProject, projects } = useProject();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [selectedProject, setSelectedProject] = useState<string | 'all'>('all');

  // Filter tasks for the current selection
  const filteredTasks = tasks.filter(task => {
    const matchesProject = selectedProject === 'all' || task.project === selectedProject;
    const hasDate = Boolean(task.dueDate);
    return matchesProject && hasDate;
  });

  // Get tasks for the selected date
  const getTasksForDate = (date: Date) => {
    return filteredTasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  // For month view, get all days with their tasks
  const getMonthTasks = () => {
    if (!selectedDate) return [];
    
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => ({
      date: day,
      tasks: getTasksForDate(day)
    }));
  };

  const selectedDayTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  const monthTasks = getMonthTasks();

  const priorityColors = {
    low: 'bg-sky-100 text-sky-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex flex-col gap-4 p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter size={14} />
              <Label htmlFor="project-filter">Project</Label>
            </div>
            <Select
              value={selectedProject}
              onValueChange={setSelectedProject}
            >
              <SelectTrigger id="project-filter" className="w-[180px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>View</Label>
            <Select
              value={viewMode}
              onValueChange={(value: 'day' | 'month') => setViewMode(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto,1fr] gap-6">
        <div className="w-fit">
          <Card className="bg-white p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
            />
          </Card>
        </div>

        <div className="space-y-4">
          {viewMode === 'day' ? (
            <>
              <h2 className="font-semibold text-xl">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
              </h2>
              <div className="space-y-3">
                {selectedDayTasks.length === 0 ? (
                  <p className="text-muted-foreground">No tasks scheduled for this date</p>
                ) : (
                  selectedDayTasks.map((task) => (
                    <Card key={task.id} className="p-4 hover-lift transition-all">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs",
                          priorityColors[task.priority]
                        )}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="grid gap-4">
              <h2 className="font-semibold text-xl">
                {selectedDate ? format(selectedDate, 'MMMM yyyy') : 'No month selected'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthTasks.map(({ date, tasks }) => (
                  <Card key={date.toISOString()} className={cn(
                    "p-4",
                    tasks.length > 0 && "hover-lift transition-all"
                  )}>
                    <div className="font-medium mb-2">
                      {format(date, 'MMMM d')}
                    </div>
                    {tasks.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No tasks</p>
                    ) : (
                      <div className="space-y-2">
                        {tasks.map(task => (
                          <div
                            key={task.id}
                            className="text-sm p-2 rounded-md bg-muted/50"
                          >
                            <div className="font-medium">{task.title}</div>
                            <span className={cn(
                              "inline-block mt-1 px-2 py-0.5 rounded-full text-xs",
                              priorityColors[task.priority]
                            )}>
                              {task.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

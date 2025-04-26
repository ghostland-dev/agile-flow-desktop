import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProject } from '../hooks/useProject';
import { Task } from '../types/project';
import { format, isSameDay, isSameMonth, addDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';

export function CalendarView() {
  const { tasks, currentProject, projects } = useProject();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode<'day' | 'week' | 'month'>('day');
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

  // Navigate to previous/next date based on view mode
  const navigateDate = (direction: 'prev' | 'next') => {
    if (!selectedDate) return;
    
    const newDate = new Date(selectedDate);
    
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setSelectedDate(newDate);
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
              onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto,1fr] gap-6">
        <div className="w-fit">
          <Card className="bg-white p-4">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              showOutsideDays={true}
            />
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl">
              {selectedDate ? (
                viewMode === 'day' ? format(selectedDate, 'MMMM d, yyyy') : 
                viewMode === 'week' ? `Week of ${format(selectedDate, 'MMMM d')}` : 
                format(selectedDate, 'MMMM yyyy')
              ) : 'No date selected'}
            </h2>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="ml-2" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Button size="sm" variant="default" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
          
          {viewMode === 'day' ? (
            <div className="space-y-3">
              {selectedDayTasks.length === 0 ? (
                <Card className="p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                    <p className="text-muted-foreground">No tasks scheduled for this date</p>
                    <Button size="sm" variant="outline" className="mt-4 gap-1">
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </Card>
              ) : (
                selectedDayTasks.map((task) => (
                  <Card key={task.id} className="p-4 hover-lift transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                      {task.priority === 'urgent' && (
                        <AlertCircle size={16} className="text-red-500 ml-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        priorityColors[task.priority]
                      )}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.project && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ 
                              backgroundColor: projects.find(p => p.id === task.project)?.color || '#888' 
                            }} 
                          />
                          {projects.find(p => p.id === task.project)?.name}
                        </span>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          ) : viewMode === 'week' ? (
            <div className="grid grid-cols-7 gap-2">
              {/* Week view would go here */}
              <Card className="p-6 col-span-7">
                <div className="flex flex-col items-center justify-center text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-muted-foreground">Week view coming soon</p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthTasks.map(({ date, tasks }) => (
                <Card 
                  key={date.toISOString()} 
                  className={cn(
                    "p-4",
                    isToday(date) && "border-primary",
                    !isSameMonth(date, selectedDate || new Date()) && "opacity-50",
                    tasks.length > 0 && "hover-lift transition-all"
                  )}
                >
                  <div className={cn(
                    "font-medium mb-2 flex justify-between items-center",
                    isToday(date) && "text-primary"
                  )}>
                    <span>{format(date, 'MMM d')}</span>
                    {isToday(date) && (
                      <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                        Today
                      </span>
                    )}
                  </div>
                  {tasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground h-12 flex items-center justify-center">No tasks</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-auto">
                      {tasks.map(task => (
                        <div
                          key={task.id}
                          className="text-sm p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="font-medium flex items-start justify-between">
                            <span className="line-clamp-1">{task.title}</span>
                            {task.priority === 'urgent' && (
                              <AlertCircle size={14} className="text-red-500 ml-1 flex-shrink-0" />
                            )}
                          </div>
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
          )}
        </div>
      </div>
    </div>
  );
}

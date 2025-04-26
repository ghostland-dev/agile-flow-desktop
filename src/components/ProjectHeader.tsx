
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Calendar, Clock, List, Play, Square, Timer, Search, Filter, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NewTaskForm } from './NewTaskForm';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

export function ProjectHeader() {
  const { currentProject, currentView, setCurrentView, tasks, startTimeTracking, stopTimeTracking, users } = useProject();
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Calculate project stats
  const totalTasks = tasks.filter(task => task.project === currentProject.id).length;
  const completedTasks = tasks.filter(task => task.project === currentProject.id && task.status === 'done').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Get team members working on this project
  const projectTeam = users.filter(user => 
    tasks.some(task => task.project === currentProject.id && task.assignee === user.id)
  ).slice(0, 5); // Limit to 5 visible members
  
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-lg flex items-center justify-center" 
              style={{ backgroundColor: currentProject.color }}
            >
              <span className="text-white font-bold text-xl">{currentProject.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="font-bold text-2xl flex items-center gap-2">
                {currentProject.name}
                <Badge variant="outline" className="ml-2 font-normal">
                  {completionPercentage}% complete
                </Badge>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {projectTeam.map((member) => (
              <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {users.length > 5 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                +{users.length - 5}
              </div>
            )}
          </div>

          {isTracking ? (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-md px-3 py-1.5 animate-pulse">
              <Timer size={16} className="text-red-500" />
              <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
              <Button variant="ghost" size="sm" className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50 p-0 px-2" onClick={stopTimer}>
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
          <NewTaskForm />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex border-b">
          {views.map((view) => (
            <button
              key={view.id}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm border-b-2 transition-colors",
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
        
        <div className="flex items-center gap-2">
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-9 w-60 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter size={14} />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                Recently updated
              </DropdownMenuItem>
              <DropdownMenuItem>
                Priority: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem>
                Priority: Low to High
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Due date: Closest first
              </DropdownMenuItem>
              <DropdownMenuItem>
                Alphabetical: A to Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


import React from 'react';
import { Task } from '@/contexts/ProjectContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskListViewProps {
  tasks: Task[];
  projects: any[];
  getProjectDetails: (projectId: string) => any;
}

export function TaskListView({ tasks, projects, getProjectDetails }: TaskListViewProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="bg-muted/50 p-2 border-b grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-5 px-3 py-2">Task Name</div>
            <div className="col-span-2 px-3 py-2">Project</div>
            <div className="col-span-2 px-3 py-2">Due Date</div>
            <div className="col-span-1 px-3 py-2">Priority</div>
            <div className="col-span-2 px-3 py-2">Status</div>
          </div>
          {tasks.length === 0 ? (
            <div className="px-3 py-8 text-center text-muted-foreground">
              No tasks found. Try clearing your filters or creating new tasks.
            </div>
          ) : (
            tasks.map(task => {
              const project = getProjectDetails(task.project);
              return (
                <div key={task.id} className="grid grid-cols-12 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                  <div className="col-span-5 px-3 py-3 flex items-center">
                    <CheckCircle size={16} className={cn(
                      "mr-2",
                      task.status === 'done' 
                        ? "text-green-500" 
                        : "text-muted-foreground/30"
                    )} />
                    <span className={cn(
                      task.status === 'done' && "line-through text-muted-foreground"
                    )}>{task.title}</span>
                  </div>
                  <div className="col-span-2 px-3 py-3 flex items-center">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: project?.color }}
                      />
                      <span className="text-sm">{project?.name}</span>
                    </div>
                  </div>
                  <div className="col-span-2 px-3 py-3 flex items-center text-sm">
                    {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : '-'}
                  </div>
                  <div className="col-span-1 px-3 py-3 flex items-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-normal text-xs capitalize",
                        task.priority === 'urgent' && "bg-red-50 text-red-700 border-red-200",
                        task.priority === 'high' && "bg-orange-50 text-orange-700 border-orange-200",
                        task.priority === 'medium' && "bg-amber-50 text-amber-700 border-amber-200",
                        task.priority === 'low' && "bg-blue-50 text-blue-700 border-blue-200"
                      )}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="col-span-2 px-3 py-3 flex items-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-normal text-xs",
                        task.status === 'todo' && "bg-gray-50 text-gray-700 border-gray-200",
                        task.status === 'in_progress' && "bg-blue-50 text-blue-700 border-blue-200",
                        task.status === 'done' && "bg-green-50 text-green-700 border-green-200"
                      )}
                    >
                      {task.status === 'todo' ? 'To Do' : 
                       task.status === 'in_progress' ? 'In Progress' : 'Done'}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

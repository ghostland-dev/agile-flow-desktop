
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TasksList() {
  const { tasks, users, currentProject, updateTaskStatus } = useProject();
  
  // Filter tasks by current project
  const projectTasks = currentProject
    ? tasks.filter(task => task.project === currentProject.id)
    : [];
  
  const priorityColors: Record<string, string> = {
    low: 'bg-sky-100 text-sky-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };
  
  const toggleTaskStatus = (taskId: string, currentStatus: string) => {
    updateTaskStatus(taskId, currentStatus === 'done' ? 'todo' : 'done');
  };
  
  return (
    <div className="p-6">
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-10 px-3 py-3"></th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Tracked
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projectTasks.map((task) => {
              const assignee = task.assignee ? users.find(u => u.id === task.assignee) : undefined;
              
              return (
                <tr key={task.id} className={cn(task.status === 'done' && "bg-gray-50")}>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Checkbox 
                      checked={task.status === 'done'}
                      onCheckedChange={() => toggleTaskStatus(task.id, task.status)}
                    />
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      <span className={cn("font-medium", task.status === 'done' && "line-through text-muted-foreground")}>
                        {task.title}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 line-clamp-1">{task.description}</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs bg-muted text-muted-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {task.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      priorityColors[task.priority]
                    )}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {assignee ? (
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={assignee.avatar} />
                          <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {task.dueDate ? (
                      <div className={cn(
                        "flex items-center text-sm",
                        new Date(task.dueDate) < new Date() ? "text-red-600" : "text-gray-700"
                      )}>
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(task.dueDate), 'MMM d')}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {task.timeTracked > 0 ? (
                      <div className="flex items-center text-sm text-gray-700">
                        <Clock className="h-4 w-4 mr-1" />
                        {Math.floor(task.timeTracked / 60)}h {task.timeTracked % 60}m
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {projectTasks.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                  No tasks found for this project
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

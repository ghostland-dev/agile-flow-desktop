
import React from 'react';
import { Task } from '../types/project';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, AlertTriangle } from 'lucide-react';

interface ProjectStatsProps {
  tasks: Task[];
}

export function ProjectStats({ tasks }: ProjectStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const urgent = tasks.filter(t => t.priority === 'urgent').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-gray-200">Project Overview</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
          <Check className="text-green-600 dark:text-green-500" />
          <div>
            <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
            <p className="text-xl font-semibold text-green-700 dark:text-green-300">{completed}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <Clock className="text-blue-600 dark:text-blue-500" />
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400">In Progress</p>
            <p className="text-xl font-semibold text-blue-700 dark:text-blue-300">{inProgress}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
          <AlertTriangle className="text-red-600 dark:text-red-500" />
          <div>
            <p className="text-sm text-red-600 dark:text-red-400">Urgent</p>
            <p className="text-xl font-semibold text-red-700 dark:text-red-300">{urgent}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm dark:text-gray-300">
          <span>Overall Progress</span>
          <span>{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>
    </div>
  );
}

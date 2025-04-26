
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getPriorityClasses } from '@/utils/taskStyles';

// Colonnes pour le rapport de complétion de tâches
export const taskCompletionColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: 'Task',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant="outline" className={
          status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
          status === 'in_review' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string;
      return (
        <Badge variant="outline" className={cn('font-normal', getPriorityClasses(priority))}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
  },
];

// Colonnes pour le rapport de temps
export const timeSpentColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: 'Task',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant="outline" className={
          status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
          status === 'in_review' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'timeTracked',
    header: 'Time Tracked',
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'efficiency',
    header: 'Efficiency',
    cell: ({ row }) => {
      const efficiency = row.getValue('efficiency') as string;
      return (
        <Badge variant="outline" className={
          efficiency === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        }>
          {efficiency}
        </Badge>
      );
    },
  },
];

// Colonnes pour le rapport de performance d'équipe
export const teamPerformanceColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Team Member',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'tasksAssigned',
    header: 'Tasks Assigned',
  },
  {
    accessorKey: 'tasksCompleted',
    header: 'Tasks Completed',
  },
  {
    accessorKey: 'completionRate',
    header: 'Completion Rate',
    cell: ({ row }) => {
      const rate = row.getValue('completionRate') as string;
      const rateNum = parseInt(rate.replace('%', ''));
      return (
        <Badge variant="outline" className={
          rateNum >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          rateNum >= 50 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }>
          {rate}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'totalTimeTracked',
    header: 'Total Time',
  },
  {
    accessorKey: 'averageTimePerTask',
    header: 'Avg Time/Task',
  },
];

// Export de toutes les colonnes
export const columns = {
  'task-completion': taskCompletionColumns,
  'time-spent': timeSpentColumns,
  'team-performance': teamPerformanceColumns,
};

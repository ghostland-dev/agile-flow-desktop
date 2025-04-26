
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  timeTracked: number;
  projectId: string;
}

export type TaskFormValues = Omit<Task, 'tags'> & {
  tags: string[] | string;
};

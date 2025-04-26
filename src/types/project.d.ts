
export type Status = 'todo' | 'in_progress' | 'in_review' | 'done' | 'backlog';
export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
  tags: string[];
  timeTracked: number;
  projectId: string;
  createdAt: string;
  project: string;
}

export type TaskFormValues = Omit<Task, 'tags'> & {
  tags: string[] | string;
};

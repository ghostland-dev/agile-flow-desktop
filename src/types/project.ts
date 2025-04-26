export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  assignee?: string;
  project: string;
  createdAt: string;
  tags: string[];
  timeTracked: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
  bio?: string;
}

export interface FileAttachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'other';
  uploadedAt: string;
  uploadedBy: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number;
}

export interface ProjectMember {
  userId: string;
  projectId: string;
  joinedAt: string;
}

export interface ProjectContextType {
  projects: Project[];
  users: User[];
  currentProject: Project | null;
  currentView: 'kanban' | 'list' | 'calendar' | 'timeline';
  loading?: boolean;
  currentUser: User | null;
  setCurrentProject: (project: Project | null) => void;
  setCurrentView: (view: 'kanban' | 'list' | 'calendar' | 'timeline') => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (projectId: string, updatedData: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  projectMembers: ProjectMember[];
  addProjectMember: (userId: string, projectId: string) => void;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
}

export interface TimeTrackingContextType {
  timeEntries: TimeEntry[];
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (taskId: string) => void;
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
}

export interface FileAttachmentContextType {
  fileAttachments: FileAttachment[];
  getTaskAttachments: (taskId: string) => FileAttachment[];
  addFileAttachment: (taskId: string, file: Omit<FileAttachment, 'id' | 'taskId' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteFileAttachment: (fileId: string) => void;
}

export interface CombinedContextType extends 
  ProjectContextType, 
  TaskContextType, 
  TimeTrackingContextType,
  FileAttachmentContextType {}


import { Project } from '@/contexts/ProjectContext';

export interface TeamMemberWithStats {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  tasksCount: number;
  completedTasks: number;
  lastActivity: Date | null;
  projectsWorkedOn: Project[];
  efficiency?: number; // Percentage of completed tasks
  availability?: 'high' | 'medium' | 'low'; // Based on current task assignments
  skills?: string[]; // Skills the team member possesses
  department?: string; // Department they belong to
  location?: string; // Remote/Office location
}

export type TeamMemberRole = 'Project Manager' | 'Developer' | 'Designer' | 'Team Member';

export interface TeamFilter {
  role?: TeamMemberRole | 'All';
  activity?: 'week' | 'month' | 'all';
  department?: string;
  availability?: 'high' | 'medium' | 'low';
}


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
}

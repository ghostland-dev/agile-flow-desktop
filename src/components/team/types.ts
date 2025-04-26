
import { Project, User } from '@/types/project';

export interface TeamMemberWithStats extends User {
  tasksCount: number;
  completedTasks: number;
  lastActivity: Date | null;
  projectsWorkedOn: (Project | undefined)[];
  role: string;
}

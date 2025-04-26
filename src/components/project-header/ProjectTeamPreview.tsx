
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useProject } from '@/hooks/useProject';

export function ProjectTeamPreview() {
  const { users, tasks, currentProject } = useProject();

  const projectTeam = currentProject ? users.filter(user => 
    tasks.some(task => task.project === currentProject.id && task.assignee === user.id)
  ).slice(0, 5) : []; // Limit to 5 visible members

  return (
    <div className="flex -space-x-2">
      {projectTeam.map((member) => (
        <Avatar key={member.id} className="border-2 border-background h-8 w-8">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-xs">
            {member.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {users.length > 5 && (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
          +{users.length - 5}
        </div>
      )}
    </div>
  );
}

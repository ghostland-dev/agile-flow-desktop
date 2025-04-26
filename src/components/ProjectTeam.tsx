import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddMemberDialog } from './team/AddMemberDialog';

export function ProjectTeam() {
  const { users, currentProject, projectMembers } = useProject();
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  
  const projectTeam = currentProject
    ? users.filter(user => 
        projectMembers.some(member => 
          member.projectId === currentProject.id && 
          member.userId === user.id
        )
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team Members</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsAddMemberDialogOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Add Member
        </Button>
      </div>
      
      <div className="space-y-3">
        {projectTeam.map(member => (
          <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
            <Avatar>
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {tasks.filter(t => t.assignee === member.id && t.project === currentProject?.id).length} tasks
            </div>
          </div>
        ))}
        
        {projectTeam.length === 0 && (
          <div className="text-center text-muted-foreground text-sm p-4">
            No team members yet
          </div>
        )}
      </div>
      
      <AddMemberDialog 
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
      />
    </div>
  );
}

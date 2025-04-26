
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeamSearch } from '@/components/team/TeamSearch';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { TeamMemberList } from '@/components/team/TeamMemberList';
import { TeamWorkloadOverview } from '@/components/team/TeamWorkloadOverview';
import { InviteMemberDialog } from '@/components/team/InviteMemberDialog';
import { TeamMemberWithStats } from '@/components/team/types';

export default function Team() {
  const { users, tasks, projects } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  // Process team member data
  const teamMembers: TeamMemberWithStats[] = users.map(user => {
    const userTasks = tasks.filter(task => task.assignee === user.id);
    const userProjects = [...new Set(userTasks.map(task => task.project))];
    const projectsWorkedOn = userProjects.map(projectId => 
      projects.find(p => p.id === projectId)
    ).filter(Boolean);
    
    return {
      ...user,
      tasksCount: userTasks.length,
      completedTasks: userTasks.filter(task => task.status === 'done').length,
      lastActivity: userTasks.length > 0 ? 
        new Date(Math.max(...userTasks.map(t => new Date(t.createdAt).getTime()))) : 
        null,
      projectsWorkedOn,
      role: user.email.includes('manager') ? 'Project Manager' : 
            user.email.includes('dev') ? 'Developer' :
            user.email.includes('design') ? 'Designer' : 'Team Member',
    };
  });
  
  // Filter team members based on search
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex-1 space-y-6 p-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground mt-1">Manage your team members and their roles</p>
          </div>
          
          <TeamSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onInviteClick={() => setIsInviteDialogOpen(true)}
          />
        </div>
        
        <Tabs defaultValue="grid" className="mb-8">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTeamMembers.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <TeamMemberList members={filteredTeamMembers} />
          </TabsContent>
        </Tabs>
        
        <TeamWorkloadOverview members={teamMembers} tasks={tasks} />
      </div>
      
      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </div>
  );
}

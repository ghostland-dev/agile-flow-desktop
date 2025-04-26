
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Team() {
  const { users, tasks } = useProject();
  
  const teamMembers = users.map(user => {
    const userTasks = tasks.filter(task => task.assignee === user.id);
    return {
      ...user,
      tasksCount: userTasks.length,
      completedTasks: userTasks.filter(task => task.status === 'done').length,
    };
  });
  
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-muted-foreground mt-1">View and manage team members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tasks</span>
                  <span className="font-medium">{member.tasksCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-medium">{member.completedTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

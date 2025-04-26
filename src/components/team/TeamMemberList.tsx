
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMemberWithStats } from './types';

interface TeamMemberListProps {
  members: TeamMemberWithStats[];
}

export function TeamMemberList({ members }: TeamMemberListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="bg-muted/50 p-2 border-b grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-3 px-3 py-2">Name</div>
            <div className="col-span-3 px-3 py-2">Email</div>
            <div className="col-span-2 px-3 py-2">Role</div>
            <div className="col-span-2 px-3 py-2">Tasks</div>
            <div className="col-span-2 px-3 py-2">Projects</div>
          </div>
          
          {members.map(member => (
            <div key={member.id} className="grid grid-cols-12 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
              <div className="col-span-3 px-3 py-4 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
              <div className="col-span-3 px-3 py-4 flex items-center text-sm">
                {member.email}
              </div>
              <div className="col-span-2 px-3 py-4 flex items-center">
                <Badge variant="outline" className="font-normal text-xs">
                  {member.role}
                </Badge>
              </div>
              <div className="col-span-2 px-3 py-4 flex items-center">
                <span className="text-sm">{member.tasksCount} ({member.completedTasks} completed)</span>
              </div>
              <div className="col-span-2 px-3 py-4 flex items-center gap-1">
                <span className="text-sm">{member.projectsWorkedOn.length}</span>
                {member.projectsWorkedOn.slice(0, 2).map(project => (
                  <div 
                    key={project.id}
                    className="h-3 w-3 rounded-full border border-white" 
                    style={{ backgroundColor: project.color }}
                    title={project.name}
                  />
                ))}
                {member.projectsWorkedOn.length > 2 && (
                  <div className="h-5 w-5 rounded-full bg-accent/70 text-xs flex items-center justify-center">
                    +{member.projectsWorkedOn.length - 2}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {members.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No team members found matching your search criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

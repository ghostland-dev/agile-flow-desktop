
import React from 'react';
import { format } from 'date-fns';
import { Mail, BarChart4, Users, Clock, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TeamMemberWithStats } from './types';

interface TeamMemberCardProps {
  member: TeamMemberWithStats;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center space-x-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{member.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Mail size={14} className="text-muted-foreground" />
              {member.email}
            </CardDescription>
            <Badge variant="secondary" className="mt-1">{member.role}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <BarChart4 size={14} />
              Tasks
            </p>
            <p className="text-2xl font-semibold">{member.tasksCount}</p>
            <div className="text-xs text-muted-foreground">
              {member.completedTasks} completed
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Users size={14} />
              Projects
            </p>
            <p className="text-2xl font-semibold">{member.projectsWorkedOn.length}</p>
            <div className="text-xs text-muted-foreground">
              {member.projectsWorkedOn.length > 0 ? 'Active' : 'No active projects'}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
            <Clock size={14} />
            {member.lastActivity ? 
              `Last activity: ${format(new Date(member.lastActivity), 'MMM d, h:mm a')}` : 
              'No recent activity'}
          </p>
          
          <div className="flex gap-2 flex-wrap">
            {member.projectsWorkedOn.slice(0, 3).map(project => (
              <div 
                key={project.id} 
                className="flex items-center gap-1 py-1 px-2 bg-accent/70 rounded-md text-xs"
              >
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: project.color }}
                />
                {project.name}
              </div>
            ))}
            {member.projectsWorkedOn.length > 3 && (
              <div className="py-1 px-2 bg-accent/70 rounded-md text-xs">
                +{member.projectsWorkedOn.length - 3} more
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              <Send size={14} className="mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

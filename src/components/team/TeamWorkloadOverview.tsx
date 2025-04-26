
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TeamMemberWithStats } from './types';

interface TeamWorkloadOverviewProps {
  members: TeamMemberWithStats[];
  tasks: any[];
}

export function TeamWorkloadOverview({ members, tasks }: TeamWorkloadOverviewProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Workload Overview</h2>
      <Card>
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
          <CardDescription>See who's working on what</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map(member => {
              const todoCount = tasks.filter(t => t.assignee === member.id && t.status === 'todo').length;
              const inProgressCount = tasks.filter(t => t.assignee === member.id && t.status === 'in_progress').length;
              const completedCount = tasks.filter(t => t.assignee === member.id && t.status === 'done').length;
              const total = todoCount + inProgressCount + completedCount;
              
              return (
                <div key={member.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{member.name}</span>
                      <span className="text-sm text-muted-foreground">{total} tasks</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden flex">
                      {inProgressCount > 0 && (
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${(inProgressCount / total) * 100}%` }}
                          title={`${inProgressCount} in progress`}
                        />
                      )}
                      {todoCount > 0 && (
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${(todoCount / total) * 100}%` }}
                          title={`${todoCount} to do`}
                        />
                      )}
                      {completedCount > 0 && (
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(completedCount / total) * 100}%` }}
                          title={`${completedCount} completed`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

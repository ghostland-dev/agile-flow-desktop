
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Données fictives pour l'activité utilisateur
const recentActivities = [
  { 
    id: 1, 
    user: { name: 'Emma Wilson', initials: 'EW', avatar: null },
    action: 'completed',
    item: 'Design Homepage Mockup',
    project: 'Website Redesign',
    time: '2 hours ago'
  },
  { 
    id: 2, 
    user: { name: 'Alex Johnson', initials: 'AJ', avatar: null },
    action: 'commented on',
    item: 'API Integration Plan',
    project: 'Mobile App',
    time: '4 hours ago'
  },
  { 
    id: 3, 
    user: { name: 'Sarah Miller', initials: 'SM', avatar: null },
    action: 'created',
    item: 'User Authentication Module',
    project: 'Backend Services',
    time: '5 hours ago'
  },
  { 
    id: 4, 
    user: { name: 'James Chen', initials: 'JC', avatar: null },
    action: 'updated',
    item: 'Payment Processing Flow',
    project: 'E-commerce Platform',
    time: '8 hours ago'
  },
  { 
    id: 5, 
    user: { name: 'Olivia Brown', initials: 'OB', avatar: null },
    action: 'assigned',
    item: 'SEO Optimization Task',
    project: 'Marketing Campaign',
    time: '1 day ago'
  }
];

const topUsers = [
  { 
    user: { name: 'Emma Wilson', initials: 'EW', avatar: null },
    completedTasks: 47,
    activeTime: '38h 25m',
    projects: 4
  },
  { 
    user: { name: 'Alex Johnson', initials: 'AJ', avatar: null },
    completedTasks: 42,
    activeTime: '35h 40m',
    projects: 3
  },
  { 
    user: { name: 'Sarah Miller', initials: 'SM', avatar: null },
    completedTasks: 39,
    activeTime: '32h 15m',
    projects: 5
  }
];

export default function UserActivity() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">User Activity</h1>
          <p className="text-muted-foreground">
            Track user engagement and activity across all projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Users active in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">24</div>
              <p className="text-sm text-muted-foreground mt-2">
                +3 from yesterday
              </p>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Top Active Users</h4>
                <div className="space-y-4">
                  {topUsers.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.user.avatar || ''} />
                          <AvatarFallback>{item.user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{item.user.name}</p>
                          <p className="text-xs text-muted-foreground">{item.activeTime} this week</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.completedTasks} tasks</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={activity.user.avatar || ''} />
                      <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className="font-medium">{activity.item}</span>
                        <span className="text-muted-foreground"> in </span>
                        <span className="font-medium">{activity.project}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>User engagement over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Activity timeline chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}


import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMemberList } from '@/components/team/TeamMemberList';
import { TeamSearch } from '@/components/team/TeamSearch';
import { InviteMemberDialog } from '@/components/team/InviteMemberDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeamMemberWithStats } from '@/components/team/types';

// Enhanced mock data to match TeamMemberWithStats interface
const teamMembers: TeamMemberWithStats[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: '',
    role: 'Product Manager',
    tasksCount: 12,
    completedTasks: 8,
    lastActivity: new Date('2023-04-25T10:30:00'),
    projectsWorkedOn: [
      { id: 'p1', name: 'Website Redesign', description: 'Redesigning the company website', createdAt: '2023-04-01', color: '#4f46e5' },
      { id: 'p2', name: 'Mobile App', description: 'Building a new mobile app', createdAt: '2023-03-15', color: '#0ea5e9' }
    ]
  },
  {
    id: '2',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: '',
    role: 'Developer',
    tasksCount: 15,
    completedTasks: 10,
    lastActivity: new Date('2023-04-25T09:15:00'),
    projectsWorkedOn: [
      { id: 'p2', name: 'Mobile App', description: 'Building a new mobile app', createdAt: '2023-03-15', color: '#0ea5e9' },
      { id: 'p3', name: 'API Integration', description: 'Integrating with third-party APIs', createdAt: '2023-02-20', color: '#10b981' }
    ]
  },
  {
    id: '3',
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    avatar: '',
    role: 'Designer',
    tasksCount: 8,
    completedTasks: 5,
    lastActivity: new Date('2023-04-24T14:45:00'),
    projectsWorkedOn: [
      { id: 'p1', name: 'Website Redesign', description: 'Redesigning the company website', createdAt: '2023-04-01', color: '#4f46e5' }
    ]
  },
  {
    id: '4',
    name: 'James Chen',
    email: 'james.c@example.com',
    avatar: '',
    role: 'Developer',
    tasksCount: 10,
    completedTasks: 3,
    lastActivity: new Date('2023-04-23T11:20:00'),
    projectsWorkedOn: [
      { id: 'p3', name: 'API Integration', description: 'Integrating with third-party APIs', createdAt: '2023-02-20', color: '#10b981' }
    ]
  },
  {
    id: '5',
    name: 'Olivia Brown',
    email: 'o.brown@example.com',
    avatar: '',
    role: 'Marketing',
    tasksCount: 6,
    completedTasks: 4,
    lastActivity: new Date('2023-04-25T08:30:00'),
    projectsWorkedOn: [
      { id: 'p4', name: 'Marketing Campaign', description: 'Q2 Marketing Campaign', createdAt: '2023-03-30', color: '#f97316' }
    ]
  },
  {
    id: '6',
    name: 'Michael Davis',
    email: 'michael.d@example.com',
    avatar: '',
    role: 'Developer',
    tasksCount: 14,
    completedTasks: 12,
    lastActivity: new Date('2023-04-25T11:45:00'),
    projectsWorkedOn: [
      { id: 'p2', name: 'Mobile App', description: 'Building a new mobile app', createdAt: '2023-03-15', color: '#0ea5e9' },
      { id: 'p3', name: 'API Integration', description: 'Integrating with third-party APIs', createdAt: '2023-02-20', color: '#10b981' }
    ]
  }
];

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false);
  
  // Filter members based on search query
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter by activity status (for demonstration purposes based on tasks completed)
  const activeMembers = filteredMembers.filter(member => 
    member.lastActivity && new Date().getTime() - member.lastActivity.getTime() < 7 * 24 * 60 * 60 * 1000
  );
  const inactiveMembers = filteredMembers.filter(member => 
    !member.lastActivity || new Date().getTime() - member.lastActivity.getTime() >= 7 * 24 * 60 * 60 * 1000
  );

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Team Members</h1>
            <p className="text-muted-foreground">
              Manage team members and their permissions
            </p>
          </div>
          <Button onClick={() => setInviteDialogOpen(true)}>Invite Member</Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <TeamSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onInviteClick={() => setInviteDialogOpen(true)}
              />
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">
                  All Members ({filteredMembers.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({activeMembers.length})
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive ({inactiveMembers.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <TeamMemberList 
                  members={filteredMembers} 
                />
              </TabsContent>
              
              <TabsContent value="active">
                <TeamMemberList 
                  members={activeMembers} 
                />
              </TabsContent>
              
              <TabsContent value="inactive">
                <TeamMemberList 
                  members={inactiveMembers} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <InviteMemberDialog 
        open={inviteDialogOpen} 
        onOpenChange={setInviteDialogOpen}
      />
    </ScrollArea>
  );
}

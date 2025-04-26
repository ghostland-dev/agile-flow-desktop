
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMemberList } from '@/components/team/TeamMemberList';
import { TeamSearch } from '@/components/team/TeamSearch';
import { InviteMemberDialog } from '@/components/team/InviteMemberDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Données fictives pour les membres de l'équipe
const teamMembers = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: '',
    role: 'Product Manager',
    status: 'active',
    lastActive: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: '',
    role: 'Developer',
    status: 'active',
    lastActive: '15 minutes ago'
  },
  {
    id: '3',
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    avatar: '',
    role: 'Designer',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: '4',
    name: 'James Chen',
    email: 'james.c@example.com',
    avatar: '',
    role: 'Developer',
    status: 'inactive',
    lastActive: '2 days ago'
  },
  {
    id: '5',
    name: 'Olivia Brown',
    email: 'o.brown@example.com',
    avatar: '',
    role: 'Marketing',
    status: 'active',
    lastActive: '3 hours ago'
  },
  {
    id: '6',
    name: 'Michael Davis',
    email: 'michael.d@example.com',
    avatar: '',
    role: 'Developer',
    status: 'active',
    lastActive: 'Just now'
  }
];

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false);
  
  // Filtrer les membres en fonction de la recherche
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filtrer par statut
  const activeMembers = filteredMembers.filter(member => member.status === 'active');
  const inactiveMembers = filteredMembers.filter(member => member.status === 'inactive');

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
                setSearchQuery={setSearchQuery}
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
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="active">
                <TeamMemberList 
                  members={activeMembers} 
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="inactive">
                <TeamMemberList 
                  members={inactiveMembers} 
                  searchQuery={searchQuery}
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

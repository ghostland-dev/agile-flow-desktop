
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus, Mail, Send, BarChart4, Clock, Users, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Team() {
  const { users, tasks, projects } = useProject();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('team-member');
  
  // Process team member data
  const teamMembers = users.map(user => {
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
  
  const handleInviteSend = (e) => {
    e.preventDefault();
    toast({
      title: "Invitation sent",
      description: `Invitation email has been sent to ${inviteEmail}`,
    });
    setIsInviteDialogOpen(false);
    setInviteEmail('');
  };
  
  return (
    <div className="flex-1 space-y-6 p-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground mt-1">Manage your team members and their roles</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 pl-9"
              />
            </div>
            
            <Button onClick={() => setIsInviteDialogOpen(true)} className="flex items-center gap-2">
              <UserPlus size={16} />
              Invite Member
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="grid" className="mb-8">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTeamMembers.map(member => (
                <Card key={member.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2 flex flex-row items-center space-x-0">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-lg">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
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
                  
                  {filteredTeamMembers.map(member => (
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
                  
                  {filteredTeamMembers.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No team members found matching your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Workload Overview</h2>
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>See who's working on what</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map(member => {
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
      </div>
      
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation email to a new team member.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInviteSend} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                placeholder="colleague@example.com"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <select 
                id="role" 
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              >
                <option value="team-member">Team Member</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="project-manager">Project Manager</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Personal Message (Optional)
              </label>
              <textarea 
                id="message" 
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[100px]"
                placeholder="Add a personal message to the invitation email..."
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

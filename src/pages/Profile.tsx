
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Pencil, Save } from 'lucide-react';

export default function Profile() {
  const { currentUser, tasks } = useProject();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    bio: currentUser?.bio || 'No bio added yet.'
  });
  
  const assignedTasks = tasks.filter(task => task.assignee === currentUser?.id);
  const completedTasks = assignedTasks.filter(task => task.status === 'done');
  const pendingTasks = assignedTasks.filter(task => task.status !== 'done');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated"
    });
    setIsEditing(false);
  };
  
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>User not found</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-2">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {!isEditing ? (
                <>
                  <CardTitle>{currentUser.name}</CardTitle>
                  <CardDescription className="flex justify-center gap-2 mt-1">
                    <Badge variant="outline">{currentUser.role}</Badge>
                  </CardDescription>
                </>
              ) : null}
            </CardHeader>
            <CardContent className="text-center">
              {!isEditing ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">{formData.bio}</p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {currentUser.email}
                  </p>
                </>
              ) : (
                <form id="profile-form" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input 
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter>
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline" 
                  className="w-full"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button 
                  form="profile-form" 
                  type="submit" 
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>Your task completion statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="col-span-1 bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold">{assignedTasks.length}</p>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                    </div>
                    <div className="col-span-1 bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold">{completedTasks.length}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="col-span-1 bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold">{pendingTasks.length}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2 pb-2 border-b text-sm">
                      <Badge variant="outline" className="w-24">Today</Badge>
                      <span>Completed task: "Setup project structure"</span>
                    </li>
                    <li className="flex items-center gap-2 pb-2 border-b text-sm">
                      <Badge variant="outline" className="w-24">Yesterday</Badge>
                      <span>Added comment to "Create user flows"</span>
                    </li>
                    <li className="flex items-center gap-2 pb-2 border-b text-sm">
                      <Badge variant="outline" className="w-24">3 days ago</Badge>
                      <span>Started task: "Implement authentication"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Tasks</CardTitle>
                  <CardDescription>All tasks assigned to you</CardDescription>
                </CardHeader>
                <CardContent>
                  {assignedTasks.length > 0 ? (
                    <div className="space-y-2">
                      {assignedTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">{task.description.substring(0, 60)}...</p>
                          </div>
                          <Badge
                            variant={task.status === 'done' ? 'default' : 'outline'}
                          >
                            {task.status === 'done' ? 'Complete' : 'Pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No tasks assigned to you</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Your recent activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0"></div>
                      <p className="text-sm font-medium">Task Completed</p>
                      <p className="text-xs text-muted-foreground">You completed "Setup project structure"</p>
                      <p className="text-xs text-muted-foreground mt-1">Today, 10:30 AM</p>
                    </div>
                    <div className="border-l-2 border-muted-foreground pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 bg-muted-foreground rounded-full -left-[7px] top-0"></div>
                      <p className="text-sm font-medium">Comment Added</p>
                      <p className="text-xs text-muted-foreground">You commented on "Create user flows"</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday, 2:15 PM</p>
                    </div>
                    <div className="border-l-2 border-muted-foreground pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 bg-muted-foreground rounded-full -left-[7px] top-0"></div>
                      <p className="text-sm font-medium">Task Started</p>
                      <p className="text-xs text-muted-foreground">You started working on "Implement authentication"</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago, 9:45 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

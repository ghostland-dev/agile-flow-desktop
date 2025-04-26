
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Shield, 
  Key, 
  Globe, 
  Palette, 
  LogOut 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Settings() {
  const { currentUser } = useProject();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isPushNotifications, setIsPushNotifications] = useState(true);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
    });
  };
  
  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDarkMode(!isDarkMode);
    toast({
      title: "Appearance updated",
      description: `Theme switched to ${isDarkMode ? 'light' : 'dark'} mode.`,
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    // In a real app, this would handle actual logout functionality
  };
  
  return (
    <div className="flex-1 space-y-6 p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 grid grid-cols-5 lg:w-fit">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback className="text-xl">
                      {currentUser?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" type="button">Change Avatar</Button>
                    <Button variant="outline" type="button" className="text-destructive hover:text-destructive">Remove</Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={currentUser?.name} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={currentUser?.email} type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="Your role" defaultValue="Project Manager" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      className="min-h-[100px] resize-none"
                      defaultValue="I'm a project manager with 5+ years of experience in software development."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <form onSubmit={handleSaveNotifications}>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell size={18} />
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about task assignments and updates.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={isEmailNotifications}
                      onCheckedChange={setIsEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell size={18} />
                        <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your device.
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={isPushNotifications}
                      onCheckedChange={setIsPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell size={18} />
                        <Label htmlFor="weekly-digest" className="font-medium">Weekly Digest</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your tasks and projects.
                      </p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked={false} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleSaveSecurity}>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Key size={18} />
                      <Label className="font-medium">Change Password</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div />
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Shield size={18} />
                      <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                      <Button variant="outline" type="button">Set up 2FA</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <form onSubmit={handleSaveAppearance}>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Palette size={18} />
                      <Label className="font-medium">Theme</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant={!isDarkMode ? "default" : "outline"}
                        className="flex items-center gap-2 w-28"
                        onClick={() => setIsDarkMode(false)}
                      >
                        <Sun size={18} />
                        Light
                      </Button>
                      <Button
                        type="button"
                        variant={isDarkMode ? "default" : "outline"}
                        className="flex items-center gap-2 w-28"
                        onClick={() => setIsDarkMode(true)}
                      >
                        <Moon size={18} />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Globe size={18} />
                      <Label htmlFor="language" className="font-medium">Language</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language.
                      </p>
                      <select 
                        className="border rounded-md px-2 py-1"
                        defaultValue="english"
                      >
                        <option value="english">English</option>
                        <option value="french">Français</option>
                        <option value="spanish">Español</option>
                        <option value="german">Deutsch</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Manage advanced features and account options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Data Export</Label>
                    <p className="text-sm text-muted-foreground">
                      Export all your tasks, projects, and account data.
                    </p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
                
                <div className="space-y-0.5 pt-4 border-t">
                  <Label className="font-medium text-destructive">Danger Zone</Label>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-sm font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Log out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

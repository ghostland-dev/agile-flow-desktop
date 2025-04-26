
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Notifications() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications Settings</h1>
          <p className="text-muted-foreground">
            Configure how you receive notifications
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked onCheckedChange={() => toast.success('Email notifications updated')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Browser Notifications</p>
                <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
              </div>
              <Switch defaultChecked onCheckedChange={() => toast.success('Browser notifications updated')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mobile Push Notifications</p>
                <p className="text-sm text-muted-foreground">Send notifications to your mobile device</p>
              </div>
              <Switch onCheckedChange={() => toast.success('Mobile notifications updated')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
            <CardDescription>Choose which events trigger notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Assignments</p>
                <p className="text-sm text-muted-foreground">When you're assigned to a task</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Updates</p>
                <p className="text-sm text-muted-foreground">When tasks are updated or completed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Comments</p>
                <p className="text-sm text-muted-foreground">When someone comments on your tasks</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Due Date Reminders</p>
                <p className="text-sm text-muted-foreground">Reminders for upcoming task deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Project Updates</p>
                <p className="text-sm text-muted-foreground">Changes to projects you're part of</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Team Activity</p>
                <p className="text-sm text-muted-foreground">Updates about team member actions</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => toast.success('Notification settings saved')}>Save Settings</Button>
        </div>
      </div>
    </ScrollArea>
  );
}


import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';

export default function Security() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage your account security and privacy
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormLabel htmlFor="current-password">Current Password</FormLabel>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <FormLabel htmlFor="new-password">New Password</FormLabel>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <FormLabel htmlFor="confirm-password">Confirm New Password</FormLabel>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button onClick={() => toast.success('Password updated successfully')}>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
              </div>
              <Switch onCheckedChange={() => toast.info('2FA status changed')} />
            </div>
            <Button variant="outline">Set Up Two-Factor Authentication</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login Sessions</CardTitle>
            <CardDescription>Manage your active sessions and devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[150px] flex items-center justify-center">
              <p className="text-muted-foreground">Active sessions will be displayed here</p>
            </div>
            <Button variant="destructive" onClick={() => toast.success('All other sessions ended')}>
              End All Other Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

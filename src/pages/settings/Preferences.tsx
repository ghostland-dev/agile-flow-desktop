
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface PreferencesForm {
  theme: 'light' | 'dark' | 'system';
  language: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    taskReminder: boolean;
    deadlineAlert: boolean;
    teamActivity: boolean;
  };
  defaultView: 'kanban' | 'list' | 'calendar' | 'timeline';
}

export default function Preferences() {
  const form = useForm<PreferencesForm>({
    defaultValues: {
      theme: 'system',
      language: 'en',
      dateFormat: 'MMM DD, YYYY',
      notifications: {
        email: true,
        push: true,
        taskReminder: true,
        deadlineAlert: true,
        teamActivity: false,
      },
      defaultView: 'kanban',
    }
  });

  const handleSubmit = (data: PreferencesForm) => {
    // Simuler une sauvegarde
    console.log('Saving preferences:', data);
    
    // Notifier l'utilisateur
    toast.success('Preferences saved successfully');
  };

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Preferences</h1>
          <p className="text-muted-foreground">
            Customize your experience and application settings
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Theme</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="light" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Light
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="dark" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Dark
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="system" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              System
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Choose your preferred theme or use your system preferences.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select your preferred language for the interface.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MMM DD, YYYY">Apr 26, 2025</SelectItem>
                            <SelectItem value="DD/MM/YYYY">26/04/2025</SelectItem>
                            <SelectItem value="MM/DD/YYYY">04/26/2025</SelectItem>
                            <SelectItem value="YYYY-MM-DD">2025-04-26</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose how dates are displayed across the application.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="notifications.email"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Notifications</FormLabel>
                        <FormDescription>
                          Receive notifications via email
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notifications.push"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Push Notifications</FormLabel>
                        <FormDescription>
                          Receive notifications in your browser
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  
                  <FormField
                    control={form.control}
                    name="notifications.taskReminder"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Task Reminders</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notifications.deadlineAlert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Deadline Alerts</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notifications.teamActivity"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Team Activity</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Configure default views and display settings</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="defaultView"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Project View</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default view" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kanban">Kanban Board</SelectItem>
                          <SelectItem value="list">List View</SelectItem>
                          <SelectItem value="calendar">Calendar</SelectItem>
                          <SelectItem value="timeline">Timeline</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the default view when opening projects.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => form.reset()}>Reset</Button>
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}

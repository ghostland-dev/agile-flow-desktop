
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FilePlus, Mail, Printer } from 'lucide-react';
import { DataTable } from '@/components/reports/DataTable';
import { columns } from '@/components/reports/columns';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function Reports() {
  const { tasks, projects, users } = useProject();
  const [reportType, setReportType] = useState('task-completion');
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [selectedProject, setSelectedProject] = useState('all');
  
  // Préparation des données pour le rapport
  const prepareReportData = () => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;
    
    // Déterminer la plage de dates
    if (timeFrame === 'weekly') {
      startDate = startOfWeek(now);
      endDate = endOfWeek(now);
    } else if (timeFrame === 'monthly') {
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
    } else {
      startDate = subDays(now, 90);
    }
    
    // Filtrer par projet si nécessaire
    let filteredTasks = [...tasks];
    if (selectedProject !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.project === selectedProject);
    }
    
    // Filtrer par période
    filteredTasks = filteredTasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return taskDate >= startDate && taskDate <= endDate;
    });
    
    // Transformer en fonction du type de rapport
    if (reportType === 'task-completion') {
      return filteredTasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        assignee: users.find(u => u.id === task.assignee)?.name || 'Unassigned',
        project: projects.find(p => p.id === task.project)?.name || 'Unknown Project',
        createdAt: format(new Date(task.createdAt), 'MMM dd, yyyy'),
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No deadline',
      }));
    } else if (reportType === 'time-spent') {
      return filteredTasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
        timeTracked: `${task.timeTracked} min`,
        assignee: users.find(u => u.id === task.assignee)?.name || 'Unassigned',
        project: projects.find(p => p.id === task.project)?.name || 'Unknown Project',
        efficiency: task.status === 'done' ? 'Good' : 'In progress'
      }));
    } else {
      // Rapport de performance d'équipe
      const teamPerformance = users.map(user => {
        const userTasks = filteredTasks.filter(t => t.assignee === user.id);
        const completedTasks = userTasks.filter(t => t.status === 'done').length;
        const totalTimeTracked = userTasks.reduce((sum, t) => sum + t.timeTracked, 0);
        
        return {
          id: user.id,
          name: user.name,
          role: user.role || 'Team Member',
          tasksAssigned: userTasks.length,
          tasksCompleted: completedTasks,
          completionRate: userTasks.length > 0 ? `${Math.round((completedTasks / userTasks.length) * 100)}%` : '0%',
          totalTimeTracked: `${totalTimeTracked} min`,
          averageTimePerTask: userTasks.length > 0 ? `${Math.round(totalTimeTracked / userTasks.length)} min` : '0 min'
        };
      });
      
      return teamPerformance.filter(tp => tp.tasksAssigned > 0);
    }
  };
  
  const reportData = prepareReportData();
  
  const handleExportReport = (format: 'pdf' | 'excel' | 'email') => {
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and export detailed project reports</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleExportReport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('excel')}>
              <FilePlus className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('email')}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Customize the report parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Tabs defaultValue={reportType} onValueChange={setReportType}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="task-completion">Tasks</TabsTrigger>
                    <TabsTrigger value="time-spent">Time</TabsTrigger>
                    <TabsTrigger value="team-performance">Team</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Frame</label>
                <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Project</label>
                <Select defaultValue={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {reportType === 'task-completion' ? 'Task Completion Report' : 
               reportType === 'time-spent' ? 'Time Tracking Report' : 'Team Performance Report'}
            </CardTitle>
            <CardDescription>
              {timeFrame === 'weekly' ? 'Weekly report' : 
               timeFrame === 'monthly' ? 'Monthly report' : 'Quarterly report'} 
              {selectedProject !== 'all' ? ` for ${projects.find(p => p.id === selectedProject)?.name}` : ' for all projects'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns[reportType]} data={reportData} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

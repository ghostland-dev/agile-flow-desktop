
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimeTracking() {
  const { timeEntries, projects } = useProject();
  
  // Calculate time spent per project
  const projectTime = projects.map(project => {
    const projectEntries = timeEntries.filter(entry => entry.projectId === project.id);
    const totalTime = projectEntries.reduce((acc, entry) => acc + entry.duration, 0);
    return {
      name: project.name,
      hours: Math.round(totalTime / 3600), // Convert seconds to hours
    };
  });
  
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Time Tracking</h1>
        <p className="text-muted-foreground mt-1">Monitor time spent across projects and tasks</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Time per Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTime}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

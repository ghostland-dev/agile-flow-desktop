
import React from 'react';
import { Project, User } from '@/types/project';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, Calendar } from 'lucide-react';

interface TimeTrackingFilterProps {
  projects: Project[];
  users: User[];
  selectedProject: string | 'all';
  selectedUser: string | 'all';
  timeRange: 'day' | 'week' | 'month' | 'all';
  onProjectChange: (projectId: string | 'all') => void;
  onUserChange: (userId: string | 'all') => void;
  onTimeRangeChange: (range: 'day' | 'week' | 'month' | 'all') => void;
}

export function TimeTrackingFilter({
  projects,
  users,
  selectedProject,
  selectedUser,
  timeRange,
  onProjectChange,
  onUserChange,
  onTimeRangeChange
}: TimeTrackingFilterProps) {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="space-y-2 w-full md:w-1/3">
            <div className="flex items-center gap-2">
              <Filter size={14} />
              <Label htmlFor="project-filter">Filter by project</Label>
            </div>
            <Select
              value={selectedProject}
              onValueChange={value => onProjectChange(value)}
            >
              <SelectTrigger id="project-filter" className="w-full">
                <SelectValue placeholder="All Projects" />
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
          
          <div className="space-y-2 w-full md:w-1/3">
            <div className="flex items-center gap-2">
              <Filter size={14} />
              <Label htmlFor="user-filter">Filter by team member</Label>
            </div>
            <Select
              value={selectedUser}
              onValueChange={value => onUserChange(value)}
            >
              <SelectTrigger id="user-filter" className="w-full">
                <SelectValue placeholder="All Team Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 w-full md:w-1/3">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <Label htmlFor="time-filter">Time period</Label>
            </div>
            <Select
              value={timeRange}
              onValueChange={value => onTimeRangeChange(value as 'day' | 'week' | 'month' | 'all')}
            >
              <SelectTrigger id="time-filter" className="w-full">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

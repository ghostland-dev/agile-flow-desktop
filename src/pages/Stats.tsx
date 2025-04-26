import React from 'react';
import { useProject } from '../hooks/useProject';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Stats() {
  const { projects, tasks, users } = useProject();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Calculate project statistics
  const projectStats = projects.map(project => {
    const projectTasks = tasks.filter(task => task.project === project.id);
    const completedTasks = projectTasks.filter(task => task.status === 'done');
    const inProgressTasks = projectTasks.filter(task => task.status === 'in_progress');
    const todoTasks = projectTasks.filter(task => task.status === 'todo');
    
    return {
      id: project.id,
      name: project.name,
      color: project.color,
      total: projectTasks.length,
      completed: completedTasks.length,
      inProgress: inProgressTasks.length,
      todo: todoTasks.length,
      progress: projectTasks.length ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0
    };
  });

  // Priority distribution data
  const priorityData = [
    { name: 'Urgent', value: tasks.filter(t => t.priority === 'urgent').length, color: '#f87171' },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#fb923c' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#fbbf24' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#38bdf8' },
  ];

  // Status distribution data
  const statusData = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length, color: '#94a3b8' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length, color: '#60a5fa' },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length, color: '#4ade80' },
  ];

  // User workload distribution
  const userWorkloadData = users.map(user => {
    const userTasks = tasks.filter(t => t.assignee === user.id);
    return {
      name: user.name.split(' ')[0],
      total: userTasks.length,
      completed: userTasks.filter(t => t.status === 'done').length,
      inProgress: userTasks.filter(t => t.status === 'in_progress').length,
      todo: userTasks.filter(t => t.status === 'todo').length,
    };
  });

  return (
    <div className="flex-1 p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Statistics & Analytics</h1>
        <Select
          value={timeRange}
          onValueChange={(value: 'week' | 'month' | 'year') => setTimeRange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {tasks.filter(t => t.status === 'done').length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active collaborators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {tasks.length ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>
                Overview of project completion status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectStats}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}%`, 
                        name === "progress" ? "Completed" : name
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="progress" name="Completion Rate" barSize={20}>
                      {projectStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectStats.map(project => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: project.color }} 
                      />
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                    <span className="text-sm font-bold">{project.progress}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="rounded-full h-2 transition-all" 
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: project.color 
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-medium">{project.total}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p className="font-medium text-green-600">{project.completed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">In Progress</p>
                          <p className="font-medium text-blue-600">{project.inProgress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>
                  Tasks grouped by priority level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tasks`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                  {priorityData.map(item => (
                    <div 
                      key={item.name}
                      className="flex items-center gap-2"
                    >
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>
                  Tasks grouped by current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tasks`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                  {statusData.map(item => (
                    <div 
                      key={item.name}
                      className="flex items-center gap-2"
                    >
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Workload</CardTitle>
              <CardDescription>
                Task distribution among team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userWorkloadData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" stackId="a" fill="#4ade80" />
                    <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#60a5fa" />
                    <Bar dataKey="todo" name="To Do" stackId="a" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

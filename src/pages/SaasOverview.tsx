
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 4500, expenses: 2500, profit: 2000 },
  { month: 'Mar', revenue: 5100, expenses: 2600, profit: 2500 },
  { month: 'Apr', revenue: 4800, expenses: 2700, profit: 2100 },
  { month: 'May', revenue: 5500, expenses: 2750, profit: 2750 },
  { month: 'Jun', revenue: 6200, expenses: 2800, profit: 3400 },
  { month: 'Jul', revenue: 6800, expenses: 2900, profit: 3900 },
  { month: 'Aug', revenue: 7400, expenses: 3100, profit: 4300 },
];

const userMetrics = [
  { month: 'Jan', active: 800, new: 120, churn: 40 },
  { month: 'Feb', active: 950, new: 150, churn: 45 },
  { month: 'Mar', active: 1100, new: 180, churn: 50 },
  { month: 'Apr', active: 1250, new: 160, churn: 48 },
  { month: 'May', active: 1400, new: 200, churn: 52 },
  { month: 'Jun', active: 1600, new: 220, churn: 55 },
  { month: 'Jul', active: 1800, new: 240, churn: 60 },
  { month: 'Aug', active: 2000, new: 260, churn: 65 },
];

const customerAcquisitionData = [
  { source: 'Organic Search', value: 35 },
  { source: 'Direct', value: 25 },
  { source: 'Referral', value: 20 },
  { source: 'Social', value: 15 },
  { source: 'Paid Ads', value: 5 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const subscriptionPlanData = [
  { plan: 'Basic', users: 850, revenue: 8500 },
  { plan: 'Premium', users: 640, revenue: 19200 },
  { plan: 'Enterprise', users: 320, revenue: 32000 },
  { plan: 'Free Trial', users: 190, revenue: 0 },
];

const performanceMetrics = [
  { metric: 'Site Uptime', value: '99.98%', change: '+0.03%', positive: true },
  { metric: 'Avg. Response Time', value: '238ms', change: '-12ms', positive: true },
  { metric: 'Conversion Rate', value: '3.2%', change: '+0.4%', positive: true },
  { metric: 'Customer Support Time', value: '4.5h', change: '-0.8h', positive: true },
];

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

const formatNumber = (value: number) => {
  return value.toLocaleString();
};

export default function SaasOverview() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">SaaS Overview</h1>
          <p className="text-muted-foreground">
            Monitor your key SaaS metrics and performance indicators
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MRR</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(12500)}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(2000)}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  14%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  0.3%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">LTV</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(850)}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Metrics - Second Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">260</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.3%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.1%</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  1.2%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ARR</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(150000)}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15%
                </span>
                <span className="text-xs text-muted-foreground">from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs flex items-center text-green-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  0.4%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="space-y-4">
                  <ChartContainer className="h-[300px]" config={{}}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                      <ChartTooltip formatter={(value) => [`$${value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue"
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        name="Expenses"
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="profit" 
                        name="Profit"
                        stroke="#ffc658" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="breakdown">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 font-medium text-sm">
                      <div>Month</div>
                      <div className="text-center">Revenue</div>
                      <div className="text-right">Growth</div>
                    </div>
                    {revenueData.map((item, index) => (
                      <div key={item.month} className="grid grid-cols-3 gap-2 text-sm border-b pb-2">
                        <div>{item.month}</div>
                        <div className="text-center">{formatCurrency(item.revenue)}</div>
                        <div className="text-right">
                          {index > 0 ? (
                            <span className={
                              item.revenue > revenueData[index - 1].revenue 
                                ? "text-green-500" 
                                : "text-red-500"
                            }>
                              {((item.revenue - revenueData[index - 1].revenue) / revenueData[index - 1].revenue * 100).toFixed(1)}%
                            </span>
                          ) : "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Active, new and churned users per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart data={userMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar 
                    dataKey="active" 
                    name="Active Users" 
                    fill="#8884d8" 
                  />
                  <Bar 
                    dataKey="new" 
                    name="New Users" 
                    fill="#82ca9d" 
                  />
                  <Bar 
                    dataKey="churn" 
                    name="Churned" 
                    fill="#ff8042" 
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>Source of new customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <PieChart>
                  <Pie
                    data={customerAcquisitionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerAcquisitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Revenue by plan type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart
                  data={subscriptionPlanData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis type="category" dataKey="plan" />
                  <ChartTooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="#8884d8" 
                    minPointSize={5}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Performance</CardTitle>
            <CardDescription>Key platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.metric} className="p-4 border rounded-lg bg-card">
                  <div className="text-sm text-muted-foreground">{metric.metric}</div>
                  <div className="text-2xl font-bold mt-1">{metric.value}</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs flex items-center ${metric.positive ? 'text-green-500' : 'text-red-500'} font-medium`}>
                      {metric.positive ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

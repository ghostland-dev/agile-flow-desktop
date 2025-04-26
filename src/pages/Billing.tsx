
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckIcon, CreditCard, Download } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

// Plans disponibles
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billing: 'forever',
    description: 'Basic features for small teams or personal use',
    features: [
      'Up to 5 projects',
      'Up to 10 users',
      'Basic task management',
      '1GB storage',
      'Community support'
    ],
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    billing: '/user/month',
    description: 'Everything you need for growing teams',
    features: [
      'Unlimited projects',
      'Unlimited users',
      'Advanced task management',
      '10GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom fields',
      'API access'
    ],
    current: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 29,
    billing: '/user/month',
    description: 'Advanced features for enterprise needs',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'SSO & SAML',
      'Advanced permissions',
      'Dedicated success manager',
      'Custom onboarding',
      'SLA guarantees',
      'Enterprise API limits'
    ],
    current: false,
  }
];

// Historique des factures
const invoices = [
  {
    id: 'INV-001',
    date: '2025-04-01',
    amount: 150,
    status: 'paid',
    users: 10
  },
  {
    id: 'INV-002',
    date: '2025-03-01',
    amount: 150,
    status: 'paid',
    users: 10
  },
  {
    id: 'INV-003',
    date: '2025-02-01',
    amount: 135,
    status: 'paid',
    users: 9
  },
  {
    id: 'INV-004',
    date: '2025-01-01',
    amount: 135,
    status: 'paid',
    users: 9
  },
  {
    id: 'INV-005',
    date: '2024-12-01',
    amount: 120,
    status: 'paid',
    users: 8
  }
];

export default function Billing() {
  const [activeTab, setActiveTab] = useState('subscription');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [currentUsers] = useState(10);
  
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    toast.info(`Selected plan: ${plans.find(p => p.id === planId)?.name}`);
  };
  
  const handleUpgrade = () => {
    toast.success(`Upgraded to ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}...`);
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground mt-1">Manage your subscription and payment details</p>
          </div>
        </div>
        
        <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro plan with {currentUsers} users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold flex items-center">
                      Pro Plan
                      <Badge variant="default" className="ml-2 bg-primary">Active</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Billing monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${currentUsers * plans.find(p => p.id === 'pro')!.price}/month</p>
                    <p className="text-sm text-muted-foreground">${plans.find(p => p.id === 'pro')!.price} per user × {currentUsers} users</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-medium">Next billing date</p>
                  <p className="text-muted-foreground">May 1, 2025</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start sm:flex-row sm:justify-between gap-4">
                <Button variant="outline">Cancel Subscription</Button>
                <Button onClick={() => toast.info('Opening user management')}>Manage Users</Button>
              </CardFooter>
            </Card>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map(plan => (
                  <Card 
                    key={plan.id} 
                    className={`cursor-pointer border-2 transition-all ${selectedPlan === plan.id ? 'border-primary' : 'hover:border-primary/50'}`}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{plan.name}</CardTitle>
                        {plan.current && <Badge className="bg-primary">Current</Badge>}
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.billing}</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map(feature => (
                          <li key={feature} className="flex items-center">
                            <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant={plan.current ? "outline" : "default"} 
                        className="w-full" 
                        disabled={plan.current}
                        onClick={handleUpgrade}
                      >
                        {plan.current ? "Current Plan" : "Upgrade"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-4 border rounded-md">
                  <div className="mr-4">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 08/2026</div>
                  </div>
                  <div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                
                <Button className="w-full">Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View and download your previous invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{format(new Date(invoice.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{invoice.users}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 capitalize">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

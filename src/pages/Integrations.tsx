
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Liste des intégrations disponibles
const INTEGRATIONS = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'development',
    description: 'Connect your GitHub repositories to track issues and PRs.',
    icon: '🐙',
    connected: false,
    popular: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    description: 'Get task notifications and updates in your Slack channels.',
    icon: '💬',
    connected: true,
    popular: true,
  },
  {
    id: 'google_calendar',
    name: 'Google Calendar',
    category: 'productivity',
    description: 'Sync due dates and meetings with your Google Calendar.',
    icon: '📅',
    connected: false,
    popular: true,
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'development',
    description: 'Sync issues and workflows between Jira and ProjectFlow.',
    icon: '🔄',
    connected: false,
    popular: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    description: 'Link Figma designs to your tasks for better visibility.',
    icon: '🎨',
    connected: false,
    popular: false,
  },
  {
    id: 'drive',
    name: 'Google Drive',
    category: 'storage',
    description: 'Attach files from Google Drive to your tasks and projects.',
    icon: '📁',
    connected: true,
    popular: false,
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'communication',
    description: 'Get notifications and updates in your Discord server.',
    icon: '🎮',
    connected: false,
    popular: true,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'storage',
    description: 'Link Dropbox files to your tasks.',
    icon: '📦',
    connected: false,
    popular: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'productivity',
    description: 'Sync your Notion pages with ProjectFlow tasks.',
    icon: '📝',
    connected: false,
    popular: true,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description: 'Create custom workflows and automations.',
    icon: '⚡',
    connected: false,
    popular: false,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payment',
    description: 'Process payments and track invoices.',
    icon: '💳',
    connected: false,
    popular: false,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'marketing',
    description: 'Sync contacts and create email campaigns.',
    icon: '📧',
    connected: false,
    popular: false,
  }
];

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  
  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected } 
        : integration
    ));
    
    // Trouver l'intégration
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      if (integration.connected) {
        toast.success(`Disconnected from ${integration.name}`);
      } else {
        toast.success(`Connected to ${integration.name} successfully`);
      }
    }
  };
  
  const configureIntegration = (name: string) => {
    toast.info(`Opening ${name} configuration...`);
  };
  
  // Filtrer les intégrations
  const filteredIntegrations = integrations
    .filter(integration => integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(integration => {
      if (activeTab === 'all') return true;
      if (activeTab === 'connected') return integration.connected;
      if (activeTab === 'popular') return integration.popular;
      return integration.category === activeTab;
    });
    
  // Catégories uniques
  const categories = ['all', 'connected', 'popular', ...new Set(integrations.map(i => i.category))];
  
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Integrations</h1>
            <p className="text-muted-foreground mt-1">Connect your favorite tools and services</p>
          </div>
          
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="overflow-x-auto w-full justify-start">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' ? 'All Integrations' : 
                 category === 'connected' ? 'Connected' :
                 category === 'popular' ? 'Popular' : category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTab} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.length > 0 ? (
                filteredIntegrations.map(integration => (
                  <Card key={integration.id} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">{integration.icon}</div>
                        <CardTitle className="text-xl">{integration.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integration.popular && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Popular
                          </Badge>
                        )}
                        <Switch
                          checked={integration.connected}
                          onCheckedChange={() => toggleConnection(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">
                        {integration.description}
                      </CardDescription>
                    </CardContent>
                    {integration.connected && (
                      <CardFooter className="pt-1 pb-4 px-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => configureIntegration(integration.name)}
                          className="w-full"
                        >
                          Configure
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No integrations found matching your criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>Use our API to build custom integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">API Key</label>
                <Button variant="ghost" size="sm" onClick={() => toast.success('New API key generated')}>
                  Regenerate
                </Button>
              </div>
              <div className="flex">
                <Input
                  type="password"
                  value="API_KEY_PLACEHOLDER_VALUE"
                  readOnly
                  className="rounded-r-none"
                />
                <Button 
                  variant="secondary"
                  className="rounded-l-none"
                  onClick={() => toast.success('API key copied to clipboard')}
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">API Documentation</label>
              <p className="text-sm text-muted-foreground mt-1">
                Access our comprehensive API documentation to learn how to integrate with our platform.
              </p>
              <Button variant="link" className="p-0 h-auto mt-2" onClick={() => toast.info('Opening API documentation')}>
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}


import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight, MessageSquare, Search, Video } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// FAQ
const faqItems = [
  {
    question: "How do I create a new project?",
    answer: "You can create a new project by navigating to the Dashboard and clicking the 'New Project' button. Fill in the project details and click 'Create'.",
    category: "projects"
  },
  {
    question: "How do I invite team members?",
    answer: "To invite team members, go to the Team section from the sidebar, then click 'Invite Member' button. Enter their email address and specify their role.",
    category: "team"
  },
  {
    question: "Can I change the status of multiple tasks at once?",
    answer: "Yes, you can select multiple tasks by holding Shift and clicking on them, then use the bulk actions menu to change their status.",
    category: "tasks"
  },
  {
    question: "How does the time tracking feature work?",
    answer: "You can track time on tasks by clicking the play button on any task. The timer will run until you stop it, and the time will be logged automatically.",
    category: "time"
  },
  {
    question: "How can I generate custom reports?",
    answer: "Navigate to the Reports section, select the type of report you want to generate, set your filters and date range, then click 'Generate Report'.",
    category: "reports"
  },
  {
    question: "How do I create recurring tasks?",
    answer: "When creating or editing a task, look for the 'Recurrence' field at the bottom of the form. Set the frequency and duration of the recurrence.",
    category: "tasks"
  },
  {
    question: "Can I export my data?",
    answer: "Yes, go to Settings > Data Management and you'll find options to export your data in various formats like CSV, JSON or PDF.",
    category: "settings"
  },
  {
    question: "How can I change my notification settings?",
    answer: "Go to your Profile page, click on 'Notification Settings' and customize which notifications you want to receive and how.",
    category: "settings"
  }
];

// Tutorials
const tutorials = [
  {
    id: 'getting-started',
    title: 'Getting Started with ProjectFlow',
    description: 'Learn the basics of ProjectFlow and set up your first project.',
    duration: '5 min',
    image: '/placeholder.svg',
    category: 'beginner'
  },
  {
    id: 'task-management',
    title: 'Mastering Task Management',
    description: 'Discover advanced techniques for managing tasks efficiently.',
    duration: '8 min',
    image: '/placeholder.svg',
    category: 'intermediate'
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board: A Complete Guide',
    description: 'Make the most of the kanban view for visual project management.',
    duration: '6 min',
    image: '/placeholder.svg',
    category: 'beginner'
  },
  {
    id: 'reports-analytics',
    title: 'Reports and Analytics',
    description: 'Learn how to use reports to gain insights into your projects.',
    duration: '10 min',
    image: '/placeholder.svg',
    category: 'advanced'
  },
  {
    id: 'time-tracking',
    title: 'Effective Time Tracking',
    description: 'Track time accurately and analyze where your team spends time.',
    duration: '7 min',
    image: '/placeholder.svg',
    category: 'intermediate'
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration Best Practices',
    description: 'Maximize team productivity with collaboration features.',
    duration: '9 min',
    image: '/placeholder.svg',
    category: 'intermediate'
  }
];

export default function Help() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filtrer les FAQ
  const filteredFaqs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Filtrer les tutoriels
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Help Center</h1>
            <p className="text-muted-foreground mt-1">Find answers, tutorials and support</p>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Need personal assistance? Our support team is ready to help you.</p>
              <Button onClick={() => toast.info('Opening support chat')}>
                Start Chat
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Learn through our comprehensive video tutorials and guides.</p>
              <Button onClick={() => toast.info('Opening video library')}>
                View Videos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Quickstart Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Get up and running quickly with our step-by-step guide.</p>
              <Button onClick={() => toast.info('Opening quickstart guide')}>
                Read Guide
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>
            
            <div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  {activeTab === 'faq' ? (
                    <>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </>
                  ) : (
                    <>
                      <TabsTrigger value="beginner">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </>
                  )}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <TabsContent value="faq" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No FAQ matches your search criteria.</p>
                    <Button variant="link" onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                      Clear filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map(tutorial => (
                  <motion.div 
                    key={tutorial.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-1" 
                          onClick={() => toast.info(`Opening tutorial: ${tutorial.title}`)}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={tutorial.image} 
                          alt={tutorial.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          <Badge variant="outline" className="capitalize">{tutorial.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-2">{tutorial.description}</CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Duration: {tutorial.duration}</span>
                          <Button variant="link" className="p-0 h-auto" size="sm">
                            Start <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 col-span-full">
                  <p className="text-muted-foreground">No tutorials match your search criteria.</p>
                  <Button variant="link" onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={() => toast.info('Opening documentation')}>Read Documentation</Button>
              <Button variant="outline" className="flex-1" onClick={() => toast.info('Opening community forums')}>Community Forums</Button>
              <Button className="flex-1">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

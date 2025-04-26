
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck, CheckCircle, Clock, FileText, Layers, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 transition-all">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-10 px-6 py-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mr-2 shadow-sm">
              <FileText size={22} className="text-primary-foreground" />
            </div>
            <h1 className="font-bold text-xl">ProjectFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
            >
              Sign up for free
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
        <div className="container mx-auto text-center relative z-10">
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6 inline-block">
            Simplify your project management workflow
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Modern project management for <span className="text-primary">agile teams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Streamline your workflow, track tasks, manage projects, and collaborate with your team in a single unified platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all px-8"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-primary/20 hover:bg-primary/5 transition-all px-8"
            >
              View Demo
            </Button>
          </div>
          
          <div className="mt-16 bg-card border rounded-xl p-3 shadow-xl relative">
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full shadow-md">
              Easy to use
            </div>
            <img 
              src="/placeholder.svg" 
              alt="ProjectFlow dashboard" 
              className="w-full rounded-lg border shadow-sm"
            />
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background px-6 transition-all">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4 inline-block">
              Everything you need
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Powerful features to boost your productivity
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All the tools you need to manage projects efficiently, in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-5">
                <Layers className="text-blue-600 dark:text-blue-400 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Multiple Project Views</h3>
              <p className="text-muted-foreground">
                Switch between Kanban, list, calendar, and timeline views to visualize your projects however you prefer.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mb-5">
                <CheckCircle className="text-green-600 dark:text-green-400 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Comprehensive Task Management</h3>
              <p className="text-muted-foreground">
                Create, assign, and track tasks with priorities, deadlines, tags, and detailed descriptions.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-5">
                <Clock className="text-amber-600 dark:text-amber-400 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Time Tracking</h3>
              <p className="text-muted-foreground">
                Track time spent on tasks with built-in timers and generate detailed reports for analysis.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-5">
                <CalendarCheck className="text-purple-600 dark:text-purple-400 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Seamless Collaboration</h3>
              <p className="text-muted-foreground">
                Work together with your team using comments, @mentions, file sharing, and real-time notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-transparent transition-all">
        <div className="container mx-auto text-center">
          <div className="bg-card rounded-2xl p-12 max-w-4xl mx-auto shadow-xl border relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/20 to-transparent rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-primary/20 to-transparent rounded-full"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4 inline-block">
                Get started today
              </span>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to boost your team's productivity?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start managing your projects with ProjectFlow today and see the difference.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all px-8"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-6 border-t transition-all">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mr-2">
                <FileText size={20} className="text-primary-foreground" />
              </div>
              <h2 className="font-bold text-xl">ProjectFlow</h2>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} ProjectFlow. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

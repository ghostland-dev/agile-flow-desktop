
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Github, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logged in successfully",
        description: "Welcome to ProjectFlow!",
      });
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center mr-2">
          <FileText size={24} className="text-white" />
        </div>
        <h1 className="font-bold text-2xl">ProjectFlow</h1>
      </div>
      
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-center">Welcome back</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full gap-2">
                  <Github size={16} />
                  Continue with GitHub
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Mail size={16} />
                  Continue with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="hello@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
                
                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full gap-2">
                  <Github size={16} />
                  Continue with GitHub
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Mail size={16} />
                  Continue with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="hello@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
                
                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

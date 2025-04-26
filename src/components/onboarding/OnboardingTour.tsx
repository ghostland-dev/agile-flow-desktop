
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Step {
  title: string;
  description: string;
  imgSrc?: string;
}

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);
  
  const steps: Step[] = [
    {
      title: "Welcome to TaskHub!",
      description: "Let's take a quick tour to help you get started with our task management platform."
    },
    {
      title: "Dashboard",
      description: "Your dashboard gives you an overview of all your projects and recent tasks."
    },
    {
      title: "Task Management",
      description: "Create, edit, and track your tasks easily. You can assign them to team members and track progress."
    },
    {
      title: "Team Collaboration",
      description: "Invite your team members and collaborate on projects efficiently."
    },
    {
      title: "You're all set!",
      description: "You're now ready to boost your productivity with TaskHub. Let's get started!"
    }
  ];
  
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setOpen(true);
      setHasSeenTour(false);
    } else {
      setHasSeenTour(true);
    }
  }, []);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const handleSkip = () => {
    completeOnboarding();
  };
  
  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenTour(true);
    setOpen(false);
  };
  
  return (
    <Dialog open={open && !hasSeenTour} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        {steps[currentStep].imgSrc && (
          <div className="my-4">
            <img 
              src={steps[currentStep].imgSrc} 
              alt={steps[currentStep].title}
              className="rounded-md w-full h-auto"
            />
          </div>
        )}
        
        <div className="flex items-center justify-center mt-4">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between mt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
          >
            {currentStep === steps.length - 1 ? "Close" : "Skip tour"}
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Get started" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

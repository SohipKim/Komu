import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft } from 'lucide-react';

interface CleaningPriorityQuestionProps {
  onNext: (value: string) => void;
  onBack: () => void;
}

export function CleaningPriorityQuestion({ onNext, onBack }: CleaningPriorityQuestionProps) {
  const [selectedPriority, setSelectedPriority] = useState('');

  const priorities = [
    {
      id: 'health',
      title: 'Health & Safety',
      description: 'Prevent germs, pests, and health hazards'
    },
    {
      id: 'comfort',
      title: 'Comfort & Relaxation',
      description: 'Create a peaceful, stress-free environment'
    },
    {
      id: 'efficiency',
      title: 'Efficiency & Function',
      description: 'Everything works smoothly and is easy to use'
    },
    {
      id: 'aesthetics',
      title: 'Aesthetics & Style',
      description: 'Beautiful, Instagram-worthy living space'
    }
  ];

  const handleNext = () => {
    if (selectedPriority) {
      onNext(selectedPriority);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center">
          <p className="text-sm text-muted-foreground">Step 3 of 3</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="w-full bg-muted h-2 rounded-full">
          <div className="bg-primary h-2 rounded-full w-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl">What's most important to you?</h1>
            <p className="text-muted-foreground">
              Understanding your priorities helps us create better cleaning plans
            </p>
          </div>

          <RadioGroup value={selectedPriority} onValueChange={setSelectedPriority}>
            <div className="space-y-3">
              {priorities.map((priority) => (
                <div key={priority.id}>
                  <Label htmlFor={priority.id} className="cursor-pointer">
                    <Card className={`p-4 border rounded-lg transition-colors ${
                      selectedPriority === priority.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={priority.id} id={priority.id} />
                        <div className="flex-1">
                          <h3>{priority.title}</h3>
                          <p className="text-sm text-muted-foreground">{priority.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button 
          onClick={handleNext} 
          className="w-full h-12 rounded-lg" 
          disabled={!selectedPriority}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
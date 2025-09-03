import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, UtensilsCrossed, Trash2, Bath, Home, Volume2 } from 'lucide-react';

interface ConflictTriggerQuestionProps {
  onNext: (value: string) => void;
  onBack: () => void;
}

export function ConflictTriggerQuestion({ onNext, onBack }: ConflictTriggerQuestionProps) {
  const [selectedTrigger, setSelectedTrigger] = useState('');

  const conflictTriggers = [
    {
      id: 'dishes',
      title: 'Dirty Dishes',
      description: 'Dishes left in sink or unwashed',
      icon: UtensilsCrossed
    },
    {
      id: 'trash',
      title: 'Full Trash',
      description: 'Overflowing bins and missed pickup days',
      icon: Trash2
    },
    {
      id: 'bathroom',
      title: 'Bathroom Mess',
      description: 'Hair, toiletries, and general uncleanliness',
      icon: Bath
    },
    {
      id: 'common-areas',
      title: 'Common Area Clutter',
      description: 'Personal items left in shared spaces',
      icon: Home
    },
    {
      id: 'noise',
      title: 'Noise & Disruption',
      description: 'Loud activities during quiet hours',
      icon: Volume2
    }
  ];

  const handleNext = () => {
    if (selectedTrigger) {
      onNext(selectedTrigger);
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
          <p className="text-sm text-muted-foreground">Step 2 of 3</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="w-full bg-muted h-2 rounded-full">
          <div className="bg-primary h-2 rounded-full w-2/3"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl">What triggers conflicts for you?</h1>
            <p className="text-muted-foreground">
              Identify your biggest pet peeves so we can help prevent conflicts
            </p>
          </div>

          <RadioGroup value={selectedTrigger} onValueChange={setSelectedTrigger}>
            <div className="space-y-3">
              {conflictTriggers.map((trigger) => (
                <div key={trigger.id}>
                  <Label htmlFor={trigger.id} className="cursor-pointer">
                    <Card className={`p-4 border rounded-lg transition-colors ${
                      selectedTrigger === trigger.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={trigger.id} id={trigger.id} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedTrigger === trigger.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <trigger.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3>{trigger.title}</h3>
                          <p className="text-sm text-muted-foreground">{trigger.description}</p>
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
          disabled={!selectedTrigger}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
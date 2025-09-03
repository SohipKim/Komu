import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, Home } from 'lucide-react';

interface CleaningPlanSizeProps {
  onNext: () => void;
  onBack: () => void;
}

export function CleaningPlanSize({ onNext, onBack }: CleaningPlanSizeProps) {
  const [selectedSize, setSelectedSize] = useState('');

  const homeSizes = [
    {
      id: 'studio',
      title: 'Studio',
      description: '1 room + bathroom + kitchen area'
    },
    {
      id: 'one-bed',
      title: '1 Bedroom',
      description: '1 bedroom + living room + kitchen + bathroom'
    },
    {
      id: 'two-bed',
      title: '2 Bedroom',
      description: '2 bedrooms + living room + kitchen + bathroom'
    },
    {
      id: 'three-bed',
      title: '3+ Bedroom',
      description: 'Multiple bedrooms + common areas'
    }
  ];

  const handleNext = () => {
    if (selectedSize) {
      onNext();
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
          <p className="text-sm text-muted-foreground">AI Cleaning Plan</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-chart-4 rounded-2xl flex items-center justify-center">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl">What's your home size?</h1>
            <p className="text-muted-foreground">
              Help us create a personalized cleaning schedule that works for your space
            </p>
          </div>

          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            <div className="space-y-3">
              {homeSizes.map((size) => (
                <div key={size.id}>
                  <Label htmlFor={size.id} className="cursor-pointer">
                    <Card className={`p-4 border rounded-lg transition-colors ${
                      selectedSize === size.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={size.id} id={size.id} />
                        <div className="flex-1">
                          <h3>{size.title}</h3>
                          <p className="text-sm text-muted-foreground">{size.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Additional Options */}
          <Card className="p-4 border rounded-lg">
            <h3 className="mb-3">Special Considerations</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Pets in the home</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>High-traffic area</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Allergies/sensitivities</span>
              </label>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button 
          onClick={handleNext} 
          className="w-full h-12 rounded-lg" 
          disabled={!selectedSize}
        >
          Generate Cleaning Plan
        </Button>
      </div>
    </div>
  );
}
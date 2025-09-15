import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft } from 'lucide-react';
import { generatePersonalReport } from './helpers';

interface FinalReportStepProps {
  name: string;
  onNameChange: (name: string) => void;
  cleanlinessLevel: 'dirty' | 'okay' | 'clean' | null;
  selectedPriorities: string[];
  onComplete: () => void;
  onBack: () => void;
}

export function FinalReportStep({
  name,
  onNameChange,
  cleanlinessLevel,
  selectedPriorities,
  onComplete,
  onBack
}: FinalReportStepProps) {
  const personalReport = generatePersonalReport(cleanlinessLevel, selectedPriorities);
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl text-foreground mb-2">Almost done!</h1>
          <p className="text-muted-foreground">
            Just need your name to complete your profile
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="what should everyone call you?"
              className="w-full"
            />
          </div>
        </div>

        {/* Report Content */}
        <div className="mb-8">
          <div className="p-4 rounded-lg border bg-muted/30">
            <p className="text-foreground leading-relaxed">
              {personalReport}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            Ready to make your home a haven of harmony!
          </p>
        </div>
        
        {/* Complete Button */}
        <Button 
          onClick={onComplete}
          className="w-full bg-black hover:bg-black/90 text-white"
          disabled={!name.trim()}
        >
          Enter my home dashboard
        </Button>
      </div>
    </div>
  );
}
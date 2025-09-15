import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft } from 'lucide-react';

interface NameInputStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function NameInputStep({
  name,
  onNameChange,
  onNext,
  onBack,
  onSkip
}: NameInputStepProps) {
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
          <button
            onClick={onSkip}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip (Dev)
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

        {/* Pagination */}
        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">4 of 5</span>
        </div>
        
        {/* Next Button */}
        <Button 
          onClick={onNext}
          className="w-full bg-black hover:bg-black/90 text-white"
          disabled={!name.trim()}
        >
          Create my personality profile
        </Button>
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { cleanlinessOptions } from './constants';

interface CleanlinessLevelStepProps {
  cleanlinessLevel: 'dirty' | 'okay' | 'clean' | null;
  onCleanlinessLevelChange: (level: 'dirty' | 'okay' | 'clean') => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function CleanlinessLevelStep({
  cleanlinessLevel,
  onCleanlinessLevelChange,
  onNext,
  onBack,
  onSkip
}: CleanlinessLevelStepProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header with Back and Skip */}
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
          <h1 className="text-2xl text-foreground mb-2">
            How does this space feel to you?
          </h1>
          <p className="text-muted-foreground">
            Your perspective helps us understand your cleanliness style
          </p>
        </div>

        {/* Image Container */}
        <div className="mb-6">
          <div className="relative overflow-hidden rounded-lg border">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1586547017149-84a20c164607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMGJlZHJvb20lMjBkaXJ0eSUyMGNsb3RoZXMlMjBzY2F0dGVyZWR8ZW58MXx8fHwxNzU2NDM3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Room to assess for cleanliness"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* Reaction Options */}
        <div className="space-y-3 mb-8">
          {cleanlinessOptions.map((option) => (
            <button
              key={option.id}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${
                cleanlinessLevel === option.id
                  ? 'border-foreground bg-accent'
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => onCleanlinessLevelChange(option.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{option.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
                {cleanlinessLevel === option.id && (
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">1 of 5</span>
        </div>
        
        {/* Navigation */}
        <Button
          onClick={onNext}
          className="w-full bg-black hover:bg-black/90 text-white"
          disabled={!cleanlinessLevel}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
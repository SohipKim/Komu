import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { generatePersonalityTraits, type PersonalityTrait } from './helpers';

interface PersonalitySummaryStepProps {
  name: string;
  cleanlinessLevel: 'dirty' | 'okay' | 'clean' | null;
  selectedPriorities: string[];
  selectedTriggers: string[];
  onComplete: () => void;
  onBack: () => void;
}

export function PersonalitySummaryStep({
  name,
  cleanlinessLevel,
  selectedPriorities,
  selectedTriggers,
  onComplete,
  onBack
}: PersonalitySummaryStepProps) {
  const personalityTraits = generatePersonalityTraits(cleanlinessLevel, selectedPriorities, selectedTriggers);
  
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
        <div className="mb-8 text-center">
          <h1 className="text-2xl text-foreground mb-2">Welcome, {name}! 👋</h1>
          <p className="text-muted-foreground">
            Here's your unique cleaning personality! ✨
          </p>
        </div>

        {/* Cute Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border border-border flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1753079258949-0ae71940f9cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2xlYW5pbmclMjBtYXNjb3QlMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzU2NDQwMTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Your cleaning personality mascot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Personality Traits */}
        <div className="space-y-6 mb-8">
          {personalityTraits.map((trait, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{trait.icon}</span>
                  <span className="font-medium text-foreground">{trait.label}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{trait.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${trait.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Fun Summary */}
        <div className="mb-8">
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border">
            <p className="text-sm text-foreground text-center leading-relaxed">
              {name}, you're the perfect blend of organized and adaptable! 🌟 Your balanced approach to cleanliness and strong social harmony make you an ideal roommate. Ready to create your dream living space?
            </p>
          </div>
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={onComplete}
          className="w-full bg-black hover:bg-black/90 text-white py-3"
        >
          Visit my house 🏠
        </Button>
      </div>
    </div>
  );
}
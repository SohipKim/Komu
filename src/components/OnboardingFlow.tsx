import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Plus } from 'lucide-react';
import type { UserProfile } from '../App';
import { conflictTriggers, cleaningPriorities } from './onboarding/constants';
import { generatePersonalReport } from './onboarding/helpers';
import { CleanlinessLevelStep } from './onboarding/CleanlinessLevelStep';
import { PersonalitySummaryStep } from './onboarding/PersonalitySummaryStep';
import { NameInputStep } from './onboarding/NameInputStep';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

type OnboardingStep = 'cleanliness-level' | 'conflict-triggers' | 'priorities' | 'name-input' | 'summary';

export function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('cleanliness-level');
  const [name, setName] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [cleanlinessLevel, setCleanlinessLevel] = useState<'dirty' | 'okay' | 'clean' | null>(null);

  const handleComplete = () => {
    if (!name.trim()) return;
    
    const profile: UserProfile = {
      id: Date.now().toString(),
      name,
      cleaningStyle: 'flexible', // Default style for simplified flow
      conflictTriggers: selectedTriggers,
      cleaningPriorities: selectedPriorities,
      personalReport: generatePersonalReport(cleanlinessLevel, selectedPriorities)
    };

    onComplete(profile);
  };

  if (step === 'cleanliness-level') {
    return (
      <CleanlinessLevelStep
        cleanlinessLevel={cleanlinessLevel}
        onCleanlinessLevelChange={setCleanlinessLevel}
        onNext={() => setStep('conflict-triggers')}
        onBack={onBack}
        onSkip={() => setStep('conflict-triggers')}
      />
    );
  }

  if (step === 'conflict-triggers') {
    const handleTriggerToggle = (triggerId: string) => {
      setSelectedTriggers(prev => 
        prev.includes(triggerId) 
          ? prev.filter(t => t !== triggerId)
          : [...prev, triggerId]
      );
    };

    const handleCustomTriggerAdd = () => {
      if (customTrigger.trim()) {
        setSelectedTriggers(prev => [...prev, customTrigger.trim()]);
        setCustomTrigger('');
        setShowCustomInput(false);
      }
    };

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <button
              onClick={() => setStep('cleanliness-level')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep('priorities')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip (Dev)
            </button>
          </div>
          
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl text-foreground mb-2">What bothers you at home?</h1>
            <p className="text-muted-foreground">
              Select any cleaning-related frustrations that apply to you
            </p>
          </div>

          {/* Trigger Options */}
          <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
            {conflictTriggers.map((trigger) => {
              const IconComponent = trigger.icon;
              const isSelected = selectedTriggers.includes(trigger.id);
              
              return (
                <button
                  key={trigger.id}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    isSelected
                      ? 'border-foreground bg-accent'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleTriggerToggle(trigger.id)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-foreground">{trigger.label}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Add Custom Trigger */}
          <div className="mb-8">
            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full p-4 rounded-lg border border-dashed border-border hover:border-muted-foreground transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Add your own frustrations</span>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                <Input
                  value={customTrigger}
                  onChange={(e) => setCustomTrigger(e.target.value)}
                  placeholder="What else bothers you?"
                  className="w-full"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomTriggerAdd();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCustomTriggerAdd}
                    className="flex-1 bg-black hover:bg-black/90 text-white"
                    disabled={!customTrigger.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomTrigger('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="text-center mb-6">
            <span className="text-sm text-muted-foreground">2 of 5</span>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              onClick={() => setStep('cleanliness-level')}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep('priorities')}
              className="flex-1 bg-black hover:bg-black/90 text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'priorities') {
    const handlePriorityToggle = (priorityId: string) => {
      setSelectedPriorities(prev => 
        prev.includes(priorityId) 
          ? prev.filter(p => p !== priorityId)
          : [...prev, priorityId]
      );
    };

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <button
              onClick={() => setStep('conflict-triggers')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep('name-input')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip (Dev)
            </button>
          </div>
          
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl text-foreground mb-2">What matters most to you?</h1>
            <p className="text-muted-foreground">
              Select the cleaning priorities that are important to you
            </p>
          </div>

          {/* Priority Options */}
          <div className="space-y-3 mb-8 max-h-80 overflow-y-auto">
            {cleaningPriorities.map((priority) => {
              const IconComponent = priority.icon;
              const isSelected = selectedPriorities.includes(priority.id);
              
              return (
                <button
                  key={priority.id}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    isSelected
                      ? 'border-foreground bg-accent'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handlePriorityToggle(priority.id)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-foreground">{priority.label}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="text-center mb-6">
            <span className="text-sm text-muted-foreground">3 of 5</span>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              onClick={() => setStep('conflict-triggers')}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep('name-input')}
              className="flex-1 bg-black hover:bg-black/90 text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'name-input') {
    return (
      <NameInputStep
        name={name}
        onNameChange={setName}
        onNext={() => setStep('summary')}
        onBack={() => setStep('priorities')}
        onSkip={() => setStep('summary')}
      />
    );
  }

  if (step === 'summary') {
    return (
      <PersonalitySummaryStep
        name={name}
        cleanlinessLevel={cleanlinessLevel}
        selectedPriorities={selectedPriorities}
        selectedTriggers={selectedTriggers}
        onComplete={handleComplete}
        onBack={() => setStep('name-input')}
      />
    );
  }

  return null;
}
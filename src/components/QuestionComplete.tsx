import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';

interface QuestionCompleteProps {
  onNext: () => void;
}

export function QuestionComplete({ onNext }: QuestionCompleteProps) {
  useEffect(() => {
    // Auto-navigate to home after 3 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Success Icon */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl">Setup Complete!</h1>
          <p className="text-muted-foreground">
            We've created your personalized profile. Let's get you started with your co-living journey.
          </p>
        </div>

        {/* Summary Card */}
        <Card className="p-6 border rounded-lg">
          <h3 className="text-center mb-4">Your Profile Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
              <span>Cleaning style preferences set</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              <span>Conflict triggers identified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
              <span>Priorities configured</span>
            </div>
          </div>
        </Card>

        {/* Auto-navigation info */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Taking you to your dashboard...
          </p>
          <Button onClick={onNext} variant="outline" className="rounded-lg">
            Continue Now
          </Button>
        </div>
      </div>
    </div>
  );
}
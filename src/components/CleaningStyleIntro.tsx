import React from 'react';
import { Button } from './ui/button';

interface CleaningStyleIntroProps {
  onStart: () => void;
  onBack: () => void;
}

export function CleaningStyleIntro({ onStart, onBack }: CleaningStyleIntroProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col px-4 py-8">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Back button */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className="text-black hover:underline"
          >
            Back
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center space-y-16">
          {/* Illustration placeholder */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl">🧹</div>
                <p className="text-gray-600">Cleaning style illustration</p>
              </div>
            </div>
          </div>

          {/* Title and subtitle */}
          <div className="text-center space-y-4">
            <h1 className="text-black leading-tight">
              Let's learn your cleaning style
            </h1>
            <p className="text-gray-600 leading-relaxed">
              You'll see a few examples of rooms and tell us how you feel about them.
            </p>
          </div>
        </div>

        {/* Start button */}
        <div className="mt-16">
          <Button 
            onClick={onStart}
            className="w-full h-14 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
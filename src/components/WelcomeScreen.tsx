import React from 'react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col px-4 py-8">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center space-y-16">
        {/* Illustration placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-4xl">🏠</div>
              <p className="text-gray-600">App benefit illustration</p>
            </div>
          </div>
        </div>

        {/* Title and subtitle */}
        <div className="text-center space-y-4">
          <h1 className="text-black leading-tight">
            Make co-living easier together
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Track chores, share contributions, and keep your home harmonious.
          </p>
        </div>

        {/* Get started button */}
        <div className="mt-16">
          <Button 
            onClick={onNext}
            className="w-full h-14 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
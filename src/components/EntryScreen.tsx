import React from 'react';
import { Button } from './ui/button';

interface EntryScreenProps {
  onCreateAccount: () => void;
  onJoinHouse: () => void;
  onSignIn: () => void;
  onQuickAccessHome: () => void;
}

export function EntryScreen({ onCreateAccount, onJoinHouse, onSignIn, onQuickAccessHome }: EntryScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-4 relative">
      {/* Quick Access Button */}
      <div className="absolute top-4 right-4">
        <Button 
          onClick={onQuickAccessHome}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-black"
        >
          Skip to Home
        </Button>
      </div>

      <div className="max-w-md mx-auto w-full space-y-16">
        {/* Title and subtitle */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-black leading-tight">
            Komu
          </h1>
          <h2 className="text-black leading-relaxed">
            A digital whiteboard for your home
          </h2>
        </div>

        {/* Buttons and link */}
        <div className="space-y-4">
          <Button 
            onClick={onCreateAccount}
            className="w-full h-14 bg-black text-white rounded-lg font-medium"
          >
            Create an account
          </Button>
          
          <Button 
            onClick={onJoinHouse}
            variant="outline"
            className="w-full h-14 border-2 border-black bg-white text-black rounded-lg font-medium hover:bg-gray-50"
          >
            Join a house
          </Button>
          
          <div className="text-center pt-4">
            <button 
              onClick={onSignIn}
              className="text-black underline-offset-4 hover:underline"
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
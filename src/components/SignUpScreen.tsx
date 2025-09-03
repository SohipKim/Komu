import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SignUpScreenProps {
  onBack: () => void;
  onSignUp: () => void;
  onSignIn: () => void;
}

export function SignUpScreen({ onBack, onSignUp, onSignIn }: SignUpScreenProps) {
  const [username, setUsername] = useState('what should everyone call you?');
  const [email, setEmail] = useState('Email@test.com');
  const [password, setPassword] = useState('Email@test.com');

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 py-8">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Back button and title */}
        <div className="space-y-6 mb-16">
          <button 
            onClick={onBack}
            className="text-[14px] text-black hover:underline"
          >
            Back
          </button>
          <h1 className="text-[24px] font-medium text-black">
            Let's get started
          </h1>
        </div>

        {/* Form fields */}
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-black">
              Username (or nickname)
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-[14px] focus:border-black focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-black">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-[14px] focus:border-black focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-black">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-[14px] focus:border-black focus:bg-white"
            />
          </div>
        </div>

        {/* Bottom section with button and link */}
        <div className="space-y-6 mt-16">
          <Button 
            onClick={onSignUp}
            className="w-full h-14 bg-gray-600 text-white rounded-lg text-[16px] font-medium hover:bg-gray-700"
          >
            Sign up
          </Button>
          
          <div className="text-center">
            <span className="text-[14px] text-black">
              already have an account?{' '}
              <button 
                onClick={onSignIn}
                className="underline hover:no-underline"
              >
                Sign In
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
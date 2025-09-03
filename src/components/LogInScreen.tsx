import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface LogInScreenProps {
  onBack: () => void;
  onLogIn: () => void;
  onForgotPassword: () => void;
}

export function LogInScreen({ onBack, onLogIn, onForgotPassword }: LogInScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('Email@test.com');
  const [password, setPassword] = useState('Password');

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
            Welcome back
          </h1>
        </div>

        {/* Form fields */}
        <div className="space-y-6 flex-1">
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-gray-100 border-2 border-gray-300 rounded-lg text-[14px] focus:border-black focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section with button and link */}
        <div className="space-y-6 mt-16">
          <Button 
            onClick={onLogIn}
            className="w-full h-14 bg-gray-600 text-white rounded-lg text-[16px] font-medium hover:bg-gray-700"
          >
            Log in
          </Button>
          
          <div className="text-center">
            <button 
              onClick={onForgotPassword}
              className="text-[14px] text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
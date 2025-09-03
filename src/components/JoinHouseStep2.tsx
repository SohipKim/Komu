import React from 'react';
import { Button } from './ui/button';

interface JoinHouseStep2Props {
  onBack: () => void;
  onJoin: () => void;
  entryCode: string;
}

export function JoinHouseStep2({ onBack, onJoin, entryCode }: JoinHouseStep2Props) {
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
            Is this your house?
          </h1>
        </div>

        {/* House card */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center space-y-6">
            {/* Dumpling character */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="text-4xl">
                  🥟
                </div>
              </div>
            </div>

            {/* House details */}
            <div className="space-y-4">
              <h2 className="text-[18px] font-medium text-black">
                Dumpling house
              </h2>
              <div className="inline-block px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-[14px] text-black">
                  2 roommates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Join button */}
        <div className="mt-16">
          <Button 
            onClick={onJoin}
            className="w-full h-14 bg-gray-600 text-white rounded-lg text-[16px] font-medium hover:bg-gray-700"
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
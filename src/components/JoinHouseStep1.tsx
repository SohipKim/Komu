import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface JoinHouseStep1Props {
  onBack: () => void;
  onJoin: (entryCode: string) => void;
}

export function JoinHouseStep1({ onBack, onJoin }: JoinHouseStep1Props) {
  const [entryCode, setEntryCode] = useState('');

  const handleJoin = () => {
    if (entryCode.trim()) {
      onJoin(entryCode);
    }
  };

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
            Join your house
          </h1>
        </div>

        {/* Instructions and form */}
        <div className="space-y-6 flex-1">
          <div className="space-y-4">
            <p className="text-[14px] text-black leading-relaxed">
              Enter the entry code your roommate shared with you.
            </p>
            <p className="text-[14px] text-gray-600">
              Example: MAIN-347B or THE-NEST-101
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-black">
              Entry code
            </label>
            <Input
              type="text"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value.toUpperCase())}
              placeholder="Entry code"
              className="w-full h-12 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-[14px] focus:border-black focus:bg-white uppercase"
            />
          </div>
        </div>

        {/* Join button */}
        <div className="mt-16">
          <Button 
            onClick={handleJoin}
            disabled={!entryCode.trim()}
            className="w-full h-14 bg-gray-600 text-white rounded-lg text-[16px] font-medium hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
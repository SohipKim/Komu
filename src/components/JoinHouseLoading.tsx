import React, { useEffect } from 'react';

interface JoinHouseLoadingProps {
  onComplete: () => void;
}

export function JoinHouseLoading({ onComplete }: JoinHouseLoadingProps) {
  useEffect(() => {
    // Simulate loading time before completing
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Loading illustration placeholder */}
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-orange-200 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🏠</div>
              <p className="text-[14px] text-gray-600">Loading illustration</p>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h1 className="text-[18px] font-medium text-black">
            Stepping into Sue's house...
          </h1>
          <p className="text-[14px] text-gray-600">
            (different branded graphic)
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
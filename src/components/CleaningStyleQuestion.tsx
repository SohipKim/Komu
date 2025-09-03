import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CleaningStyleQuestionProps {
  onNext: (value: string) => void;
  onBack: () => void;
}

const roomPhotos = [
  {
    id: 'messy-kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1535186696008-7cba739a3103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMGtpdGNoZW4lMjBkaXNoZXMlMjBjbHV0dGVyfGVufDF8fHx8MTc1NjA5NDY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Messy kitchen with dishes and clutter'
  },
  {
    id: 'normal-living-room',
    imageUrl: 'https://images.unsplash.com/photo-1661099548731-fc8f74fc9dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3JtYWwlMjBsaXZpbmclMjByb29tJTIwY296eXxlbnwxfHx8fDE3NTYwOTQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Normal living room with some items around'
  },
  {
    id: 'clean-bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1721308899499-d74aa31da376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG9yZ2FuaXplZCUyMGJlZHJvb20lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc1NjA5NDY5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Very clean and organized bedroom'
  }
];

const emojiOptions = [
  { emoji: '😖', label: 'Dirty', value: 'dirty' },
  { emoji: '🙂', label: 'It\'s okay', value: 'okay' },
  { emoji: '😍', label: 'Clean', value: 'clean' }
];

export function CleaningStyleQuestion({ onNext, onBack }: CleaningStyleQuestionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReactions, setSelectedReactions] = useState<Record<number, string>>({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < roomPhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleEmojiSelect = (value: string) => {
    setSelectedReactions(prev => ({
      ...prev,
      [currentIndex]: value
    }));
  };

  const handleNext = () => {
    const reactions = Object.values(selectedReactions);
    if (reactions.length > 0) {
      onNext(reactions.join(','));
    }
  };

  const handleSkip = () => {
    onNext('skipped');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Skip */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={onBack}
          className="text-[14px] text-black hover:underline"
        >
          Back
        </button>
        
        <div className="text-center">
          <p className="text-[14px] text-gray-600">
            {currentIndex + 1} of {roomPhotos.length}
          </p>
        </div>
        
        <button 
          onClick={handleSkip}
          className="text-[14px] text-black hover:underline"
        >
          Skip
        </button>
      </div>

      {/* Photo Cards Container */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {roomPhotos.map((photo, index) => (
              <div key={photo.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mx-auto max-w-sm">
                  {/* Photo */}
                  <div className="aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={photo.imageUrl}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Emoji Options */}
                  <div className="p-6">
                    <div className="flex justify-center space-x-4">
                      {emojiOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleEmojiSelect(option.value)}
                          className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                            selectedReactions[currentIndex] === option.value
                              ? 'bg-gray-100 border-2 border-black'
                              : 'hover:bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          <span className="text-2xl mb-1">{option.emoji}</span>
                          <span className="text-[12px] text-gray-600">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {roomPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows (for desktop) */}
      <div className="hidden md:flex absolute top-1/2 left-4 right-4 justify-between pointer-events-none">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
        >
          ←
        </button>
        <button
          onClick={() => setCurrentIndex(Math.min(roomPhotos.length - 1, currentIndex + 1))}
          disabled={currentIndex === roomPhotos.length - 1}
          className={`pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
            currentIndex === roomPhotos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
        >
          →
        </button>
      </div>

      {/* Footer */}
      <div className="p-4">
        <Button 
          onClick={handleNext}
          disabled={Object.keys(selectedReactions).length === 0}
          className="w-full h-14 bg-black text-white rounded-lg text-[16px] font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
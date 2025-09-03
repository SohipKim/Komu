import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';

interface ContributionFeedbackProps {
  onBack: () => void;
}

export function ContributionFeedback({ onBack }: ContributionFeedbackProps) {
  const [showAllCheersForMe, setShowAllCheersForMe] = useState(false);
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const cheersForMe = [
    {
      id: 1,
      icon: '❤️',
      message: 'You received a ❤️ for helping with laundry!',
      background: 'bg-pink-50 border-pink-100'
    },
    {
      id: 2,
      icon: '👏',
      message: 'Sue cheered you with 👏 on your task: Vacuuming',
      background: 'bg-blue-50 border-blue-100'
    },
    {
      id: 3,
      icon: '⭐',
      message: 'Amazing job organizing the kitchen - you\'re a star! ⭐',
      background: 'bg-purple-50 border-purple-100'
    },
    {
      id: 4,
      icon: '🌸',
      message: 'Min sent you a 🌸 for being awesome today',
      background: 'bg-orange-50 border-orange-100'
    },
    {
      id: 5,
      icon: '🎉',
      message: 'Party time! 🎉 Thanks for making the bathroom sparkle',
      background: 'bg-yellow-50 border-yellow-100'
    },
    {
      id: 6,
      icon: '🏆',
      message: 'Trophy time! 🏆 You crushed that deep clean session',
      background: 'bg-green-50 border-green-100'
    },
    {
      id: 7,
      icon: '💫',
      message: 'You\'re magical! ✨ The living room never looked better',
      background: 'bg-indigo-50 border-indigo-100'
    }
  ];

  const cheersToGive = [
    {
      id: 1,
      person: 'Sohee',
      task: 'Washing dishes',
      message: 'Sohee completed a task!'
    },
    {
      id: 2,
      person: 'Alex',
      task: 'Organizing books and magazines',
      message: 'Alex finished tidying the living room!'
    },
    {
      id: 3,
      person: 'Jordan',
      task: 'Wiping counters and stovetop',
      message: 'Jordan made the kitchen shine!'
    }
  ];

  const handleReactionClick = (reaction: string, personId: number) => {
    // Handle sending reaction
    console.log(`Sent ${reaction} to person ${personId}`);
  };

  const handleCheerCardClick = (cardId: number, emoji: string) => {
    setAnimatingCard(cardId);
    
    // Set celebration message
    const messages = [
      "Yay! That felt good! 🎉",
      "You're so appreciated! ✨",
      "Spreading the love! 💕",
      "Your efforts matter! 🌟",
      "Keep shining! ⭐"
    ];
    setCelebrationMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    // Generate sparkle particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 250 - 125, // Wider spread
      y: Math.random() * 250 - 125,
      emoji: Math.random() > 0.3 ? emoji : ['✨', '💫', '⭐', '🌟', '💝', '🎊'][Math.floor(Math.random() * 6)]
    }));
    
    setParticles(newParticles);
    
    // Clear animation after duration
    setTimeout(() => {
      setAnimatingCard(null);
      setParticles([]);
      setCelebrationMessage('');
    }, 2000);
  };

  if (showAllCheersForMe) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setShowAllCheersForMe(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1>All Cheers</h1>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="p-4 space-y-4">
          {cheersForMe.map((cheer) => (
            <div key={cheer.id} className="relative overflow-hidden">
              <Card 
                className={`p-4 rounded-lg ${cheer.background} cursor-pointer transition-all duration-200 hover:scale-105 relative ${
                  animatingCard === cheer.id ? 'scale-105 shadow-xl' : ''
                }`}
                onClick={() => handleCheerCardClick(cheer.id, cheer.icon)}
              >
                {/* Rainbow glow effect */}
                {animatingCard === cheer.id && (
                  <div className="absolute inset-0 rounded-lg animate-rainbow opacity-30 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
                )}
                
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`text-3xl transition-all duration-300 ${
                    animatingCard === cheer.id ? 'animate-bounce scale-150 drop-shadow-lg' : ''
                  }`}>
                    {cheer.icon}
                  </div>
                  <div className="flex-1">
                    <p className={animatingCard === cheer.id ? 'animate-pulse font-medium' : ''}>{cheer.message}</p>
                  </div>
                </div>
                
                {/* Ripple effect */}
                {animatingCard === cheer.id && (
                  <div className="absolute inset-0 rounded-lg border-4 border-white animate-ping opacity-75"></div>
                )}
              </Card>
              
              {/* Particle burst animations */}
              {animatingCard === cheer.id && particles.map((particle, index) => (
                <div
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%)`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div 
                    className="text-xl"
                    style={{
                      animation: `sparkle-burst 1.5s ease-out forwards`,
                      transform: `translate(${particle.x}px, ${particle.y}px)`
                    }}
                  >
                    {particle.emoji}
                  </div>
                </div>
              ))}
              
              {/* Confetti effect */}
              {animatingCard === cheer.id && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][i % 6],
                        left: `${20 + (i * 60) % 80}%`,
                        top: `${20 + (i * 30) % 60}%`,
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @keyframes sparkle-burst {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
          }
          25% {
            opacity: 1;
            transform: scale(1.5) rotate(90deg);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.8) rotate(180deg);
          }
          75% {
            opacity: 0.5;
            transform: scale(1.2) rotate(270deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
          }
        }
        
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg) brightness(1.2); }
          25% { filter: hue-rotate(90deg) brightness(1.3); }
          50% { filter: hue-rotate(180deg) brightness(1.4); }
          75% { filter: hue-rotate(270deg) brightness(1.3); }
          100% { filter: hue-rotate(360deg) brightness(1.2); }
        }
        
        .animate-rainbow {
          animation: rainbow 1s linear infinite;
        }
        
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
        
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
      `}</style>
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center">
          <h1>Commu Notes</h1>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Celebration Message */}
        {celebrationMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-6 py-3 shadow-xl border-2 border-yellow-400 animate-bounce z-50">
            <p className="text-center font-medium text-lg">{celebrationMessage}</p>
          </div>
        )}
        
        {/* Cheers for me */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>Cheers for me</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => setShowAllCheersForMe(true)}
            >
              View all
            </Button>
          </div>
          
          {cheersForMe.slice(0, 3).map((cheer) => (
            <div key={cheer.id} className="relative overflow-hidden">
              <Card 
                className={`p-4 rounded-lg ${cheer.background} cursor-pointer transition-all duration-200 hover:scale-105 relative ${
                  animatingCard === cheer.id ? 'scale-105 shadow-xl' : ''
                }`}
                onClick={() => handleCheerCardClick(cheer.id, cheer.icon)}
              >
                {/* Rainbow glow effect */}
                {animatingCard === cheer.id && (
                  <div className="absolute inset-0 rounded-lg animate-rainbow opacity-30 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
                )}
                
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`text-3xl transition-all duration-300 ${
                    animatingCard === cheer.id ? 'animate-bounce scale-150 drop-shadow-lg' : ''
                  }`}>
                    {cheer.icon}
                  </div>
                  <div className="flex-1">
                    <p className={animatingCard === cheer.id ? 'animate-pulse font-medium' : ''}>{cheer.message}</p>
                  </div>
                </div>
                
                {/* Ripple effect */}
                {animatingCard === cheer.id && (
                  <div className="absolute inset-0 rounded-lg border-4 border-white animate-ping opacity-75"></div>
                )}
              </Card>
              
              {/* Particle burst animations */}
              {animatingCard === cheer.id && particles.map((particle, index) => (
                <div
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%)`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div 
                    className="text-xl"
                    style={{
                      animation: `sparkle-burst 1.5s ease-out forwards`,
                      transform: `translate(${particle.x}px, ${particle.y}px)`
                    }}
                  >
                    {particle.emoji}
                  </div>
                </div>
              ))}
              
              {/* Confetti effect */}
              {animatingCard === cheer.id && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][i % 6],
                        left: `${20 + (i * 60) % 80}%`,
                        top: `${20 + (i * 30) % 60}%`,
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cheers to give */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>Cheers to give</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
          
          {cheersToGive.map((item) => (
            <Card key={item.id} className="p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <p>{item.message}</p>
                  <p className="text-muted-foreground">Task: {item.task}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button 
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleReactionClick('❤️', item.id)}
                    >
                      ❤️
                    </button>
                    <button 
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleReactionClick('👏', item.id)}
                    >
                      👏
                    </button>
                    <button 
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleReactionClick('⭐', item.id)}
                    >
                      ⭐
                    </button>
                    <button 
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleReactionClick('🌸', item.id)}
                    >
                      🌸
                    </button>
                    <button 
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleReactionClick('🏆', item.id)}
                    >
                      🏆
                    </button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Add a note
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Support message box */}
        <Card className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🐰</div>
            <div className="flex-1">
              <p className="mb-2">Need help finding the right words?</p>
              <Button size="sm" variant="outline" className="bg-white">
                Send Msg
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
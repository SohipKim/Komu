import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Calendar, Heart, Star, ThumbsUp, User } from 'lucide-react';

interface ContributionHistoryProps {
  onBack: () => void;
}

export function ContributionHistory({ onBack }: ContributionHistoryProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'interactive'>('calendar');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  // Mock data for the current week's MVP
  const weeklyMVP = {
    name: 'Sohee',
    avatar: '👤',
    heartsEarned: 85
  };

  // Mock calendar data (showing hearts contributed per day)
  const calendarData = {
    currentMonth: 'August 2025',
    weeks: [
      {
        weekNumber: 1,
        days: [
          { day: 'Mon', date: 28, hearts: 5, isCurrentWeek: false },
          { day: 'Tue', date: 29, hearts: 8, isCurrentWeek: false },
          { day: 'Wed', date: 30, hearts: 3, isCurrentWeek: false },
          { day: 'Thu', date: 31, hearts: 6, isCurrentWeek: false },
          { day: 'Fri', date: 1, hearts: 10, isCurrentWeek: false },
          { day: 'Sat', date: 2, hearts: 4, isCurrentWeek: false },
          { day: 'Sun', date: 3, hearts: 7, isCurrentWeek: false }
        ]
      },
      {
        weekNumber: 2,
        days: [
          { day: 'Mon', date: 4, hearts: 12, isCurrentWeek: false },
          { day: 'Tue', date: 5, hearts: 6, isCurrentWeek: false },
          { day: 'Wed', date: 6, hearts: 9, isCurrentWeek: false },
          { day: 'Thu', date: 7, hearts: 4, isCurrentWeek: false },
          { day: 'Fri', date: 8, hearts: 11, isCurrentWeek: false },
          { day: 'Sat', date: 9, hearts: 8, isCurrentWeek: false },
          { day: 'Sun', date: 10, hearts: 5, isCurrentWeek: false }
        ]
      },
      {
        weekNumber: 3,
        days: [
          { day: 'Mon', date: 11, hearts: 15, isCurrentWeek: true },
          { day: 'Tue', date: 12, hearts: 8, isCurrentWeek: true },
          { day: 'Wed', date: 13, hearts: 12, isCurrentWeek: true },
          { day: 'Thu', date: 14, hearts: 6, isCurrentWeek: true },
          { day: 'Fri', date: 15, hearts: 9, isCurrentWeek: true },
          { day: 'Sat', date: 16, hearts: 0, isCurrentWeek: true },
          { day: 'Sun', date: 17, hearts: 0, isCurrentWeek: true }
        ]
      },
      {
        weekNumber: 4,
        days: [
          { day: 'Mon', date: 18, hearts: 0, isCurrentWeek: false },
          { day: 'Tue', date: 19, hearts: 0, isCurrentWeek: false },
          { day: 'Wed', date: 20, hearts: 0, isCurrentWeek: false },
          { day: 'Thu', date: 21, hearts: 0, isCurrentWeek: false },
          { day: 'Fri', date: 22, hearts: 0, isCurrentWeek: false },
          { day: 'Sat', date: 23, hearts: 0, isCurrentWeek: false },
          { day: 'Sun', date: 24, hearts: 0, isCurrentWeek: false }
        ]
      }
    ]
  };

  // Mock interactive view data
  const interactiveData = [
    { name: 'Sohee', totalHearts: 95, color: 'bg-red-500' },
    { name: 'Sue', totalHearts: 75, color: 'bg-purple-500' },
    { name: 'Min', totalHearts: 60, color: 'bg-blue-500' }
  ];

  // Mock weekly details data
  const weeklyContributions = [
    {
      id: 1,
      area: 'Kitchen',
      frequency: 'Daily',
      task: 'Vacuum the floor',
      hearts: 30,
      person: 'Sohee',
      date: 'Aug 31st',
      reactions: { hearts: 3, thumbs: 1, stars: 2 }
    },
    {
      id: 2,
      area: 'Bathroom',
      frequency: 'Weekly',
      task: 'Deep clean bathroom',
      hearts: 25,
      person: 'Sue',
      date: 'Aug 30th',
      reactions: { hearts: 2, thumbs: 4, stars: 1 }
    },
    {
      id: 3,
      area: 'Living Room',
      frequency: 'Weekly',
      task: 'Organize living space',
      hearts: 20,
      person: 'Min',
      date: 'Aug 29th',
      reactions: { hearts: 5, thumbs: 2, stars: 3 }
    }
  ];

  const getCurrentWeekData = () => {
    return calendarData.weeks.find(week => 
      week.days.some(day => day.isCurrentWeek)
    );
  };

  const currentWeek = getCurrentWeekData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Contribution History</h1>
        <div className="flex items-center space-x-2">
          <p className="text-xs">Calendar</p>
          <Switch
            checked={viewMode === 'interactive'}
            onCheckedChange={(checked) => setViewMode(checked ? 'interactive' : 'calendar')}
          />
          <p className="text-xs">Interactive</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* MVP Section */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-300">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-yellow-800">This week's MVP is {weeklyMVP.name}!</h2>
                <p className="text-yellow-600">
                  {weeklyMVP.heartsEarned} hearts earned this week
                </p>
              </div>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Send Thank You
            </Button>
          </div>
        </Card>

        {/* Calendar/Interactive View */}
        {viewMode === 'calendar' ? (
          <Card className="p-6">
            <div className="mb-4">
              <h2>Calendar View</h2>
              <p className="text-muted-foreground">{calendarData.currentMonth}</p>
            </div>
            
            <div className="space-y-4">
              {calendarData.weeks.map((week) => (
                <div key={week.weekNumber} className="space-y-2">
                  <h4 className="font-medium">Week {week.weekNumber}</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {week.days.map((day, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border text-center ${
                          day.isCurrentWeek 
                            ? 'bg-blue-50 border-blue-200' 
                            : week.weekNumber < 3 
                              ? 'bg-gray-50 border-gray-200 opacity-60' 
                              : 'border-gray-200'
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">{day.day}</p>
                        <p className="font-medium">{day.date}</p>
                        {day.hearts > 0 && (
                          <div className="flex items-center justify-center mt-1">
                            <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                            <p className="text-xs ml-1">{day.hearts}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="mb-4">
              <h2>Interactive View</h2>
              <p className="text-muted-foreground">Total contributions by person</p>
            </div>
            
            <div className="flex justify-center items-end space-x-8 h-48">
              {interactiveData.map((person) => (
                <div key={person.name} className="flex flex-col items-center space-y-3">
                  {/* Candy heart visualization */}
                  <div 
                    className={`${person.color} rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-105`}
                    style={{ 
                      width: `${Math.max(60, person.totalHearts)}px`, 
                      height: `${Math.max(60, person.totalHearts)}px` 
                    }}
                  >
                    <div className="text-center">
                      <Heart className="h-6 w-6 fill-current mx-auto" />
                      <p className="text-xs font-bold">{person.totalHearts}</p>
                    </div>
                  </div>
                  <h4>{person.name}</h4>
                  <p className="text-xs text-muted-foreground">{person.totalHearts} total hearts</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Weekly Detail Section */}
        <Card className="p-6">
          <div className="mb-4">
            <h2>{currentWeek?.weekNumber}rd Week Details</h2>
            <p className="text-muted-foreground">
              Week of Aug {currentWeek?.days[0].date} - {currentWeek?.days[6].date}
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                <SelectTrigger>
                  <SelectValue placeholder="Person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All People</SelectItem>
                  <SelectItem value="sohee">Sohee</SelectItem>
                  <SelectItem value="sue">Sue</SelectItem>
                  <SelectItem value="min">Min</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="bathroom">Bathroom</SelectItem>
                  <SelectItem value="living-room">Living Room</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contribution Cards */}
          <div className="space-y-4">
            {weeklyContributions.map((contribution) => (
              <Card key={contribution.id} className="p-4 border-2">
                {/* Tags */}
                <div className="flex space-x-2 mb-3">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      contribution.area === 'Kitchen' ? 'bg-green-100 text-green-800' :
                      contribution.area === 'Bathroom' ? 'bg-blue-100 text-blue-800' :
                      contribution.area === 'Living Room' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100'
                    }`}
                  >
                    {contribution.area}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      contribution.frequency === 'Daily' ? 'bg-orange-100 text-orange-800' :
                      contribution.frequency === 'Weekly' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'
                    }`}
                  >
                    {contribution.frequency}
                  </Badge>
                </div>

                {/* Task Content */}
                <div className="mb-3">
                  <h4>{contribution.task}</h4>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Hearts */}
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <p>x{contribution.hearts}</p>
                    </div>
                    
                    {/* Person and Date */}
                    <div className="text-muted-foreground">
                      <p>{contribution.person} • {contribution.date}</p>
                    </div>
                  </div>
                  
                  {/* Quick Reactions */}
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                      <Heart className="h-3 w-3" />
                      <span className="text-xs ml-1">{contribution.reactions.hearts}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs ml-1">{contribution.reactions.thumbs}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                      <Star className="h-3 w-3" />
                      <span className="text-xs ml-1">{contribution.reactions.stars}</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
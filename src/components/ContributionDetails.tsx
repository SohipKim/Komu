import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';

interface ContributionDetailsProps {
  onBack: () => void;
}

export function ContributionDetails({ onBack }: ContributionDetailsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const contributionData = [
    { name: 'You', percentage: 45, tasks: 9, hours: 6.5, color: 'bg-chart-1' },
    { name: 'Alex', percentage: 30, tasks: 6, hours: 4.2, color: 'bg-chart-2' },
    { name: 'Jordan', percentage: 25, tasks: 5, hours: 3.8, color: 'bg-chart-3' }
  ];

  const historyData = [
    { date: '2025-01-15', task: 'Deep clean bathroom', person: 'You', duration: '45 min' },
    { date: '2025-01-14', task: 'Kitchen cleanup', person: 'Alex', duration: '30 min' },
    { date: '2025-01-13', task: 'Vacuum living room', person: 'Jordan', duration: '20 min' },
    { date: '2025-01-12', task: 'Take out trash', person: 'You', duration: '5 min' },
    { date: '2025-01-11', task: 'Wipe counters', person: 'Alex', duration: '15 min' }
  ];

  const weeklyTrends = [
    { week: 'This week', you: 45, alex: 30, jordan: 25 },
    { week: 'Last week', you: 40, alex: 35, jordan: 25 },
    { week: '2 weeks ago', you: 38, alex: 32, jordan: 30 },
    { week: '3 weeks ago', you: 42, alex: 28, jordan: 30 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center">
          <h1>Contribution Details</h1>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Period Selector */}
      <div className="p-4 border-b">
        <div className="flex justify-center">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Contribution Overview */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Contribution Breakdown</h2>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>20 total tasks</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {contributionData.map((person) => (
              <div key={person.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${person.color} rounded`}></div>
                    <span>{person.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{person.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{person.tasks} tasks</div>
                  </div>
                </div>
                <Progress value={person.percentage} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{person.hours}h total time</span>
                  <span>Avg {(person.hours / person.tasks).toFixed(1)}h per task</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trends */}
        <Card className="p-6 rounded-lg">
          <h2 className="text-xl mb-4">Weekly Trends</h2>
          <div className="space-y-4">
            {weeklyTrends.map((week, index) => (
              <div key={week.week} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{week.week}</span>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? 'Current' : `${index} week${index > 1 ? 's' : ''} ago`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-chart-1 rounded"></div>
                    <span>You: {week.you}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-chart-2 rounded"></div>
                    <span>Alex: {week.alex}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-chart-3 rounded"></div>
                    <span>Jordan: {week.jordan}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent History */}
        <Card className="p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-3">
            {historyData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm">{item.task}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.person} • {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm">{item.duration}</div>
                  <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                    item.person === 'You' ? 'bg-chart-1' : 
                    item.person === 'Alex' ? 'bg-chart-2' : 'bg-chart-3'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
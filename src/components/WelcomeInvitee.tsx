import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, Home } from 'lucide-react';

interface WelcomeInviteeProps {
  onNext: () => void;
}

export function WelcomeInvitee({ onNext }: WelcomeInviteeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-chart-2 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl">You've been invited!</h1>
          <p className="text-muted-foreground">
            Alex has invited you to join their co-living space at Apartment 4B
          </p>
        </div>

        {/* Apartment Info */}
        <Card className="p-6 border rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3>Apartment 4B</h3>
              <p className="text-sm text-muted-foreground">123 Main Street</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current residents:</span>
              <span>2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Move-in date:</span>
              <span>Flexible</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rent contribution:</span>
              <span>$800/month</span>
            </div>
          </div>
        </Card>

        {/* Current Roommates */}
        <Card className="p-4 border rounded-lg">
          <h3 className="mb-3">Current Roommates</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                A
              </div>
              <div>
                <h4 className="text-sm">Alex</h4>
                <p className="text-xs text-muted-foreground">Sent the invitation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-3 text-white rounded-full flex items-center justify-center">
                J
              </div>
              <div>
                <h4 className="text-sm">Jordan</h4>
                <p className="text-xs text-muted-foreground">Lives here 8 months</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={onNext} className="w-full h-12 rounded-lg">
            Accept Invitation
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-lg">
            Ask Questions First
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help? <span className="text-primary cursor-pointer">Contact support</span>
          </p>
        </div>
      </div>
    </div>
  );
}
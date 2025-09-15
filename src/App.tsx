import React, { useState } from 'react';
import { EntryScreen } from './components/EntryScreen';
import { LogInScreen } from './components/LogInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { JoinHouseStep1 } from './components/JoinHouseStep1';
import { JoinHouseStep2 } from './components/JoinHouseStep2';
import { JoinHouseLoading } from './components/JoinHouseLoading';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HomeDashboard } from './components/HomeDashboard';
import { WelcomeInvitee } from './components/WelcomeInvitee';
import { CleaningPlanSize } from './components/CleaningPlanSize';
import { ContributionHistory } from './components/ContributionHistory';
import { ContributionFeedback } from './components/ContributionFeedback';

export interface UserProfile {
  id: string;
  name: string;
  cleaningStyle: string;
  conflictTriggers: string[];
  cleaningPriorities: string[];
  personalReport?: string;
}

type AppScreen = 
  | 'entry'
  | 'login'
  | 'signup'
  | 'join-house-step1'
  | 'join-house-step2'
  | 'join-house-loading'
  | 'onboarding'
  | 'home'
  | 'welcome-invitee'
  | 'cleaning-plan-size'
  | 'contribution-history'
  | 'commu-notes';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('entry');
  const [entryCode, setEntryCode] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    navigateTo('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'entry':
        return (
          <EntryScreen 
            onCreateAccount={() => navigateTo('signup')}
            onJoinHouse={() => navigateTo('join-house-step1')}
            onSignIn={() => navigateTo('login')}
            onQuickAccessHome={() => navigateTo('home')}
          />
        );
      case 'join-house-step1':
        return (
          <JoinHouseStep1 
            onBack={() => navigateTo('entry')}
            onJoin={(code) => {
              setEntryCode(code);
              navigateTo('join-house-step2');
            }}
          />
        );
      case 'join-house-step2':
        return (
          <JoinHouseStep2 
            onBack={() => navigateTo('join-house-step1')}
            onJoin={() => navigateTo('join-house-loading')}
            entryCode={entryCode}
          />
        );
      case 'join-house-loading':
        return (
          <JoinHouseLoading 
            onComplete={() => navigateTo('onboarding')}
          />
        );
      case 'login':
        return (
          <LogInScreen 
            onBack={() => navigateTo('entry')}
            onLogIn={() => navigateTo('onboarding')}
            onForgotPassword={() => {/* Handle forgot password */}}
          />
        );
      case 'signup':
        return (
          <SignUpScreen 
            onBack={() => navigateTo('entry')}
            onSignUp={() => navigateTo('onboarding')}
            onSignIn={() => navigateTo('login')}
          />
        );
      case 'onboarding':
        return (
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            onBack={() => navigateTo('entry')}
          />
        );
      case 'home':
        return (
          <HomeDashboard 
            onNavigate={navigateTo}
            onViewContributions={() => navigateTo('contribution-history')}
            onViewCommuNotes={() => navigateTo('commu-notes')}
            onCreateCleaningPlan={() => navigateTo('cleaning-plan-size')}
          />
        );
      case 'welcome-invitee':
        return <WelcomeInvitee onNext={() => navigateTo('home')} />;
      case 'cleaning-plan-size':
        return <CleaningPlanSize onNext={() => navigateTo('home')} onBack={() => navigateTo('home')} />;
      case 'contribution-history':
        return <ContributionHistory onBack={() => navigateTo('home')} />;
      case 'commu-notes':
        return <ContributionFeedback onBack={() => navigateTo('home')} />;
      default:
        return (
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            onBack={() => navigateTo('entry')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}
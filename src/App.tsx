import React, { useState } from 'react';
import { EntryScreen } from './components/EntryScreen';
import { LogInScreen } from './components/LogInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { JoinHouseStep1 } from './components/JoinHouseStep1';
import { JoinHouseStep2 } from './components/JoinHouseStep2';
import { JoinHouseLoading } from './components/JoinHouseLoading';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CleaningStyleIntro } from './components/CleaningStyleIntro';
import { CleaningStyleQuestion } from './components/CleaningStyleQuestion';
import { ConflictTriggerQuestion } from './components/ConflictTriggerQuestion';
import { CleaningPriorityQuestion } from './components/CleaningPriorityQuestion';
import { QuestionComplete } from './components/QuestionComplete';
import { HomeDashboard } from './components/HomeDashboard';
import { WelcomeInvitee } from './components/WelcomeInvitee';
import { CleaningPlanSize } from './components/CleaningPlanSize';
import { ContributionHistory } from './components/ContributionHistory';
import { ContributionFeedback } from './components/ContributionFeedback';

type AppScreen = 
  | 'entry'
  | 'login'
  | 'signup'
  | 'join-house-step1'
  | 'join-house-step2'
  | 'join-house-loading'
  | 'welcome'
  | 'cleaning-style-intro'
  | 'cleaning-style' 
  | 'conflict-trigger'
  | 'cleaning-priority'
  | 'question-complete'
  | 'home'
  | 'welcome-invitee'
  | 'cleaning-plan-size'
  | 'contribution-history'
  | 'commu-notes';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('entry');
  const [entryCode, setEntryCode] = useState('');
  const [userAnswers, setUserAnswers] = useState({
    cleaningStyle: '',
    conflictTrigger: '',
    cleaningPriority: ''
  });

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const updateAnswer = (key: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [key]: value }));
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
            onComplete={() => navigateTo('welcome')}
          />
        );
      case 'login':
        return (
          <LogInScreen 
            onBack={() => navigateTo('entry')}
            onLogIn={() => navigateTo('welcome')}
            onForgotPassword={() => {/* Handle forgot password */}}
          />
        );
      case 'signup':
        return (
          <SignUpScreen 
            onBack={() => navigateTo('entry')}
            onSignUp={() => navigateTo('welcome')}
            onSignIn={() => navigateTo('login')}
          />
        );
      case 'welcome':
        return <WelcomeScreen onNext={() => navigateTo('cleaning-style-intro')} />;
      case 'cleaning-style-intro':
        return (
          <CleaningStyleIntro 
            onStart={() => navigateTo('cleaning-style')}
            onBack={() => navigateTo('welcome')}
          />
        );
      case 'cleaning-style':
        return (
          <CleaningStyleQuestion 
            onNext={(value) => {
              updateAnswer('cleaningStyle', value);
              navigateTo('conflict-trigger');
            }}
            onBack={() => navigateTo('cleaning-style-intro')}
          />
        );
      case 'conflict-trigger':
        return (
          <ConflictTriggerQuestion 
            onNext={(value) => {
              updateAnswer('conflictTrigger', value);
              navigateTo('cleaning-priority');
            }}
            onBack={() => navigateTo('cleaning-style')}
          />
        );
      case 'cleaning-priority':
        return (
          <CleaningPriorityQuestion 
            onNext={(value) => {
              updateAnswer('cleaningPriority', value);
              navigateTo('question-complete');
            }}
            onBack={() => navigateTo('conflict-trigger')}
          />
        );
      case 'question-complete':
        return <QuestionComplete onNext={() => navigateTo('home')} />;
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
        return <WelcomeScreen onNext={() => navigateTo('cleaning-style')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}
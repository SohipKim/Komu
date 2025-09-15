import { Clock, Volume2, Utensils, Lightbulb, Trash2, Users, Home, ShowerHead, Sofa, Wind, Package } from 'lucide-react';

export const cleaningStyles = [
  { id: 'zen', name: 'Zen Clean Mode', desc: 'I find peace in slow, mindful cleaning', icon: '🧘‍♀️' },
  { id: 'efficient', name: 'Speed Cleaning', desc: 'Quick bursts, maximum impact', icon: '⚡' },
  { id: 'thorough', name: 'Deep Clean Devotee', desc: 'Every corner deserves attention', icon: '🔍' },
  { id: 'flexible', name: 'Go with the Flow', desc: 'I adapt to what the home needs', icon: '🌊' }
] as const;

export const conflictTriggers = [
  { id: 'dishes-sink', label: 'Dishes left in sink overnight', icon: Utensils },
  { id: 'loud-music', label: 'Loud music after 10pm', icon: Volume2 },
  { id: 'toilet-paper', label: 'Not replacing empty toilet paper', icon: Home },
  { id: 'fridge-space', label: 'Taking up too much fridge space', icon: Home },
  { id: 'cooking-cleanup', label: 'Not cleaning up after cooking', icon: Utensils },
  { id: 'lights-on', label: 'Leaving lights on', icon: Lightbulb },
  { id: 'chore-turns', label: 'Not taking turns with chores', icon: Clock },
  { id: 'guests-notice', label: 'Guests without notice', icon: Users }
];

export const cleaningPriorities = [
  { id: 'kitchen', label: 'Kitchen cleanliness', icon: Utensils },
  { id: 'bathroom', label: 'Bathroom hygiene', icon: ShowerHead },
  { id: 'common-area', label: 'Common area tidiness', icon: Sofa },
  { id: 'trash', label: 'Taking out trash regularly', icon: Trash2 },
  { id: 'noise', label: 'Keeping noise levels down', icon: Volume2 },
  { id: 'shared-items', label: 'Respecting shared items', icon: Package },
  { id: 'air-freshness', label: 'Maintaining air freshness', icon: Wind },
  { id: 'organizing', label: 'Organizing shared spaces', icon: Home }
];

export const cleanlinessOptions = [
  { id: 'dirty', label: 'Dirty', emoji: '😬', description: 'This space needs some love' },
  { id: 'okay', label: "It's Okay", emoji: '😐', description: 'Not bad, could be tidier' },
  { id: 'clean', label: 'Clean', emoji: '😊', description: 'Looking fresh and tidy!' }
] as const;
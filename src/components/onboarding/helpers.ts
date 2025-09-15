export type PersonalityTrait = {
  label: string;
  percentage: number;
  icon: string;
};

export const generatePersonalityTraits = (
  cleanlinessLevel: 'dirty' | 'okay' | 'clean' | null,
  selectedPriorities: string[],
  selectedTriggers: string[]
): PersonalityTrait[] => {
  const traits = [];
  
  // Energy level based on cleanliness tolerance
  const energyLevel = cleanlinessLevel === 'clean' ? 85 : cleanlinessLevel === 'okay' ? 65 : 45;
  traits.push({ label: 'Energy Level', percentage: energyLevel, icon: '⚡' });
  
  // Flexibility based on selected priorities
  const flexibilityLevel = selectedPriorities.length <= 2 ? 90 : selectedPriorities.length <= 4 ? 70 : 50;
  traits.push({ label: 'Flexibility', percentage: flexibilityLevel, icon: '🌊' });
  
  // Directness based on conflict triggers
  const directnessLevel = selectedTriggers.length >= 5 ? 80 : selectedTriggers.length >= 3 ? 60 : 40;
  traits.push({ label: 'Directness', percentage: directnessLevel, icon: '🎯' });
  
  // Social harmony (inverse of conflict triggers)
  const harmonyLevel = Math.max(20, 100 - (selectedTriggers.length * 10));
  traits.push({ label: 'Social Harmony', percentage: harmonyLevel, icon: '🤝' });
  
  return traits;
};

export const generatePersonalReport = (
  cleanlinessLevel: 'dirty' | 'okay' | 'clean' | null,
  selectedPriorities: string[]
): string => {
  const cleanlinessDesc = cleanlinessLevel === 'dirty' ? 'sees potential in every space' : 
                         cleanlinessLevel === 'okay' ? 'appreciates balanced living' : 
                         'values pristine environments';
  
  const prioritiesText = selectedPriorities.length > 0 ? 
    ` Your focus on ${selectedPriorities.slice(0, 2).join(' and ')} shows what matters most to you in shared living.` : '';
  
  return `Welcome to your harmonious home journey! As someone who ${cleanlinessDesc}, you bring thoughtful consideration to creating a space everyone can enjoy.${prioritiesText} You're already contributing to a more peaceful home. 🏡✨`;
};

// Fix: Import React to make React.FC type available.
import React from 'react';

export interface Rank {
  title: string;
  xpRequired: number;
  nextLevelXp: number;
  icon: React.FC<{ className?: string }>;
}

export interface UserProfile {
  name: string;
  rank: Rank;
  xp: number;
  xpToNextLevel: number;
  aetherShards: number;
  completedQuests: number;
}

export interface Quest {
  day: number;
  title: string;
  description: string;
  category: 'Anatomy' | 'Color Theory' | 'Composition' | 'Storytelling' | 'Gesture';
  rewards: {
    xp: number;
    aetherShards: number;
  };
}

export interface Critique {
  questTitle: string;
  feedback: string;
  imageUrl: string;
}

export interface Rival {
  name: string;
  rank: string;
  mastery: string;
  avatarUrl: string;
}


import React, { useState, useEffect } from 'react';
import { UserProfile, Quest, Critique, Rank } from './types';
import { ARTIST_RANKS, SEVEN_DAY_CHALLENGE, RIVAL_DATA } from './constants';
import Dashboard from './components/Dashboard';
import ProfileSidebar from './components/ProfileSidebar';
import Header from './components/Header';
import { getCritique } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { Analytics } from '@vercel/analytics/react';


const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Artisan",
    rank: ARTIST_RANKS[0],
    xp: 25,
    xpToNextLevel: 100,
    aetherShards: 150,
    completedQuests: 0,
  });
  const [quests, setQuests] = useState<Quest[]>(SEVEN_DAY_CHALLENGE);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [critique, setCritique] = useState<Critique | null>(null);
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuest = quests[currentQuestIndex];

  const findRank = (xp: number): Rank => {
    return [...ARTIST_RANKS].reverse().find(r => xp >= r.xpRequired) || ARTIST_RANKS[0];
  };

  const handleQuestComplete = async (imageFile: File) => {
    if (!currentQuest) return;

    setIsCritiquing(true);
    setError(null);
    setCritique(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const mimeType = imageFile.type;
      
      const critiqueText = await getCritique(base64Image, mimeType, currentQuest.title);
      
      const newCritique = {
        questTitle: currentQuest.title,
        feedback: critiqueText,
        imageUrl: URL.createObjectURL(imageFile),
      };
      setCritique(newCritique);

      // Update user profile
      setUserProfile(prev => {
        // Fix: Correctly calculate total XP, find the new rank, and then update state.
        // This resolves the duplicate 'xp' property error and makes the state logic consistent.
        const currentTotalXp = prev.rank.xpRequired + prev.xp;
        const newTotalXp = currentTotalXp + currentQuest.rewards.xp;
        const newRank = findRank(newTotalXp);
        const xpToNextLevel = newRank.nextLevelXp - newRank.xpRequired;
        const currentLevelXp = newTotalXp - newRank.xpRequired;

        return {
          ...prev,
          rank: newRank,
          xp: currentLevelXp,
          xpToNextLevel: xpToNextLevel,
          aetherShards: prev.aetherShards + currentQuest.rewards.aetherShards,
          completedQuests: prev.completedQuests + 1,
        };
      });

      // Move to next quest
      if (currentQuestIndex < quests.length - 1) {
        setCurrentQuestIndex(prev => prev + 1);
      } else {
        // Handle end of challenges, maybe loop or show a message
        console.log("All challenges completed!");
      }
    } catch (err) {
      setError("Failed to get critique. The AI might be busy, or the image is invalid. Please try again.");
      console.error(err);
    } finally {
      setIsCritiquing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col md:flex-row">
      <Analytics />
      <ProfileSidebar userProfile={userProfile} rival={RIVAL_DATA} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Header />
        <Dashboard
          quest={currentQuest}
          onQuestComplete={handleQuestComplete}
          critique={critique}
          isCritiquing={isCritiquing}
          error={error}
          onCloseCritique={() => setCritique(null)}
        />
      </main>
    </div>
  );
};

export default App;

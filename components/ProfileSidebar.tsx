
import React from 'react';
import { UserProfile, Rival } from '../types';
import BrushIcon from './icons/BrushIcon';
import GemIcon from './icons/GemIcon';
import TrophyIcon from './icons/TrophyIcon';

const ProfileSidebar: React.FC<{ userProfile: UserProfile; rival: Rival }> = ({ userProfile, rival }) => {
  const { name, rank, xp, xpToNextLevel, aetherShards, completedQuests } = userProfile;
  const xpPercentage = (xp / xpToNextLevel) * 100;
  
  const RankIcon = rank.icon;

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-gray-900/70 border-b md:border-b-0 md:border-r border-gray-800 p-6 flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* User Profile Section */}
        <div className="flex items-center mb-6">
          <img src={`https://picsum.photos/seed/${name}/100/100`} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-orange-500" />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-orange-400 flex items-center">
                <RankIcon className="w-4 h-4 mr-1.5" />
                {rank.title}
            </p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
            <span>Progress</span>
            <span>{xp} / {xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Stats</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-300">
                    <span className="flex items-center"><GemIcon className="w-5 h-5 mr-2 text-cyan-400"/> Aether Shards</span>
                    <span className="font-bold text-cyan-400">{aetherShards}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                    <span className="flex items-center"><TrophyIcon className="w-5 h-5 mr-2 text-green-400"/> Quests Completed</span>
                    <span className="font-bold text-white">{completedQuests}</span>
                </div>
            </div>
        </div>

        {/* Rival Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Your Rival</h3>
            <div className="flex items-center">
                <img src={rival.avatarUrl} alt="Rival Avatar" className="w-12 h-12 rounded-full border-2 border-red-500" />
                <div className="ml-4">
                    <h4 className="font-bold text-red-400">{rival.name}</h4>
                    <p className="text-sm text-gray-400">{rival.rank}</p>
                    <p className="text-xs text-gray-500">Mastery: {rival.mastery}</p>
                </div>
            </div>
        </div>

        {/* Monetization Section */}
        <div className="mt-auto bg-gradient-to-t from-orange-900/30 to-transparent p-4 -m-4 rounded-b-lg">
             <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">ArtForge Pro</h3>
                <p className="text-sm text-gray-400 mb-4">Unlock personalized learning paths, advanced quests, and more.</p>
                <button className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors">
                    Learn More
                </button>
            </div>
        </div>

      </div>
    </aside>
  );
};

export default ProfileSidebar;

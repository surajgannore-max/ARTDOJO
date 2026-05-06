
import React, { useState, useRef } from 'react';
import { Quest, Critique } from '../types';
import CritiqueModal from './CritiqueModal';
import { UI_TEXT } from '../constants';

interface DashboardProps {
  quest: Quest;
  onQuestComplete: (file: File) => void;
  critique: Critique | null;
  isCritiquing: boolean;
  error: string | null;
  onCloseCritique: () => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const categoryColors: { [key: string]: string } = {
        'Anatomy': 'bg-red-500/20 text-red-300 border-red-500/30',
        'Color Theory': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'Composition': 'bg-green-500/20 text-green-300 border-green-500/30',
        'Storytelling': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        'Gesture': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    };
    return (
        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${categoryColors[category] || 'bg-gray-500/20 text-gray-300'}`}>
            {category}
        </span>
    );
}

const Dashboard: React.FC<DashboardProps> = ({ quest, onQuestComplete, critique, isCritiquing, error, onCloseCritique }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      onQuestComplete(imageFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Daily Quest</h2>
                <h1 className="text-3xl font-bold text-white mt-1">{quest.title}</h1>
            </div>
            <CategoryBadge category={quest.category} />
        </div>

        <p className="text-gray-300 max-w-3xl mb-6">{quest.description}</p>
        
        <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Submit Your Work</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <label 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full md:w-1/2 h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:border-orange-500 hover:bg-gray-800 transition-colors duration-200"
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
                    ) : (
                        <div className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p className="mt-2">Drag & drop your artwork here</p>
                            <p className="text-sm text-gray-500">or click to select a file</p>
                        </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>

                <div className="w-full md:w-1/2">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-4">
                        <h4 className="font-semibold text-gray-200">Rewards</h4>
                        <div className="flex gap-6 mt-2">
                           <p className="text-yellow-400 font-bold">{quest.rewards.xp} XP</p>
                           <p className="text-cyan-400 font-bold">{quest.rewards.aetherShards} Aether Shards</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!imageFile || isCritiquing}
                        className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                    >
                        {isCritiquing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Forge is Analyzing...
                            </>
                        ) : (
                            UI_TEXT.marketing.cta
                        )}
                    </button>
                    {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                </div>
            </div>
        </div>
      </div>
      
      {critique && (
        <CritiqueModal critique={critique} onClose={onCloseCritique} />
      )}
    </div>
  );
};

export default Dashboard;

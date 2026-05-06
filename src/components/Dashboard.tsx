
import React, { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
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
                            <Upload className="mx-auto h-12 w-12 mb-2" />
                            <p className="">Drag & drop your artwork here</p>
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
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
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

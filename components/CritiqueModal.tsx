
import React from 'react';
import { Critique } from '../types';

interface CritiqueModalProps {
  critique: Critique;
  onClose: () => void;
}

// A simple markdown parser for bold and lists
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
            return <h3 key={index} className="text-lg font-bold text-orange-400 mt-4 mb-2">{line.substring(2, line.length - 2)}</h3>;
        }
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="mb-2">{line}</p>;
    });

    return <>{elements}</>;
};

const CritiqueModal: React.FC<CritiqueModalProps> = ({ critique, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-900/50">
          <h2 className="text-xl font-bold text-gray-200 mb-4 text-center">Your Submission for "{critique.questTitle}"</h2>
          <img src={critique.imageUrl} alt="User submission" className="w-full h-auto object-contain rounded-lg max-h-[70vh]" />
        </div>
        <div className="w-full md:w-1/2 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Forge's Critique</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 text-gray-300">
             <SimpleMarkdown text={critique.feedback} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CritiqueModal;

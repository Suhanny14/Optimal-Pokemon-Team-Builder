import React from 'react';

const ModeSelector = ({ currentMode, setCurrentMode, selectedOpponent, selectedPlayer }) => (
  <div className="flex gap-3 mb-6">
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
        currentMode === 'opponent' 
          ? 'bg-red-500 text-white shadow-lg' 
          : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
      }`}
      onClick={() => setCurrentMode('opponent')}
    >
      <span>🔴</span>
      Select Opponent ({selectedOpponent.length}/3)
    </button>
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
        currentMode === 'player' 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50'
      }`}
      onClick={() => setCurrentMode('player')}
    >
      <span>🔵</span>
      Build Your Team ({selectedPlayer.length}/6)
    </button>
  </div>
);

export default ModeSelector; 
import React from 'react';

const OptimizationControls = ({ weights, setWeights, optimizeTeam, isOptimizing, optimizationProgress, clearTeam, selectedOpponent }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
    <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
      🧠 Auto-Optimization Settings
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <div>
        <label className="block font-bold text-sm text-gray-600 mb-2">
          Offense Priority: {weights.offense}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={weights.offense}
          onChange={(e) => setWeights(prev => ({ ...prev, offense: parseInt(e.target.value) }))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">Focus on type advantages and attack power</div>
      </div>
      
      <div>
        <label className="block font-bold text-sm text-gray-600 mb-2">
          Defense Priority: {weights.defense}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={weights.defense}
          onChange={(e) => setWeights(prev => ({ ...prev, defense: parseInt(e.target.value) }))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">Focus on resistances and defensive stats</div>
      </div>
      
      <div>
        <label className="block font-bold text-sm text-gray-600 mb-2">
          Stats Priority: {weights.stats}
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={weights.stats}
          onChange={(e) => setWeights(prev => ({ ...prev, stats: parseInt(e.target.value) }))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">Focus on overall stat totals</div>
      </div>
    </div>

    <div className="flex gap-4">
      <button
        onClick={optimizeTeam}
        disabled={isOptimizing || selectedOpponent.length === 0}
        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
      >
        {isOptimizing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Optimizing...
          </>
        ) : (
          <>
            🧠 Auto-Optimize Team
            {selectedOpponent.length === 0 && <span className="text-sm">(Select opponent first)</span>}
          </>
        )}
      </button>
      
      <button
        onClick={clearTeam}
        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors flex items-center gap-2"
      >
        🗑️ Clear Team
      </button>
    </div>

    {isOptimizing && (
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-300"
            style={{ width: `${optimizationProgress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          Analyzing {Math.floor(optimizationProgress * 15)} combinations... {optimizationProgress}%
        </p>
      </div>
    )}
  </div>
);

export default OptimizationControls; 
import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Pokemon Data
const pokemonData = [
  { name: "Charizard", types: ["fire", "flying"], hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100, role: "Sweeper" },
  { name: "Blastoise", types: ["water"], hp: 79, attack: 83, defense: 100, spAttack: 85, spDefense: 105, speed: 78, role: "Tank" },
  { name: "Venusaur", types: ["grass", "poison"], hp: 80, attack: 82, defense: 83, spAttack: 100, spDefense: 100, speed: 80, role: "Balanced" },
  { name: "Pikachu", types: ["electric"], hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90, role: "Sweeper" },
  { name: "Alakazam", types: ["psychic"], hp: 55, attack: 50, defense: 45, spAttack: 135, spDefense: 95, speed: 120, role: "Sweeper" },
  { name: "Machamp", types: ["fighting"], hp: 90, attack: 130, defense: 80, spAttack: 65, spDefense: 85, speed: 55, role: "Tank" },
  { name: "Gengar", types: ["ghost", "poison"], hp: 60, attack: 65, defense: 60, spAttack: 130, spDefense: 75, speed: 110, role: "Sweeper" },
  { name: "Dragonite", types: ["dragon", "flying"], hp: 91, attack: 134, defense: 95, spAttack: 100, spDefense: 100, speed: 80, role: "Balanced" },
  { name: "Mewtwo", types: ["psychic"], hp: 106, attack: 110, defense: 90, spAttack: 154, spDefense: 90, speed: 130, role: "Sweeper" },
  { name: "Gyarados", types: ["water", "flying"], hp: 95, attack: 125, defense: 79, spAttack: 60, spDefense: 100, speed: 81, role: "Sweeper" },
  { name: "Lapras", types: ["water", "ice"], hp: 130, attack: 85, defense: 80, spAttack: 85, spDefense: 95, speed: 60, role: "Wall" },
  { name: "Snorlax", types: ["normal"], hp: 160, attack: 110, defense: 65, spAttack: 65, spDefense: 110, speed: 30, role: "Wall" },
  { name: "Garchomp", types: ["dragon", "ground"], hp: 108, attack: 130, defense: 95, spAttack: 80, spDefense: 85, speed: 102, role: "Sweeper" },
  { name: "Lucario", types: ["fighting", "steel"], hp: 70, attack: 110, defense: 70, spAttack: 115, spDefense: 70, speed: 90, role: "Balanced" },
  { name: "Tyranitar", types: ["rock", "dark"], hp: 100, attack: 134, defense: 110, spAttack: 95, spDefense: 100, speed: 61, role: "Tank" },
  { name: "Metagross", types: ["steel", "psychic"], hp: 80, attack: 135, defense: 130, spAttack: 95, spDefense: 90, speed: 70, role: "Tank" },
  { name: "Salamence", types: ["dragon", "flying"], hp: 95, attack: 135, defense: 80, spAttack: 110, spDefense: 80, speed: 100, role: "Sweeper" },
  { name: "Blaziken", types: ["fire", "fighting"], hp: 80, attack: 120, defense: 70, spAttack: 110, spDefense: 70, speed: 80, role: "Sweeper" },
  { name: "Swampert", types: ["water", "ground"], hp: 100, attack: 110, defense: 90, spAttack: 85, spDefense: 90, speed: 60, role: "Tank" },
  { name: "Gardevoir", types: ["psychic", "fairy"], hp: 68, attack: 65, defense: 65, spAttack: 125, spDefense: 115, speed: 80, role: "Support" },
  { name: "Aggron", types: ["steel", "rock"], hp: 70, attack: 110, defense: 180, spAttack: 60, spDefense: 60, speed: 50, role: "Wall" },
  { name: "Rayquaza", types: ["dragon", "flying"], hp: 105, attack: 150, defense: 90, spAttack: 150, spDefense: 90, speed: 95, role: "Sweeper" },
  { name: "Dialga", types: ["steel", "dragon"], hp: 100, attack: 120, defense: 120, spAttack: 150, spDefense: 100, speed: 90, role: "Balanced" },
  { name: "Palkia", types: ["water", "dragon"], hp: 90, attack: 120, defense: 100, spAttack: 150, spDefense: 120, speed: 100, role: "Sweeper" },
  { name: "Giratina", types: ["ghost", "dragon"], hp: 150, attack: 100, defense: 120, spAttack: 100, spDefense: 120, speed: 90, role: "Wall" },
  { name: "Darkrai", types: ["dark"], hp: 70, attack: 90, defense: 90, spAttack: 135, spDefense: 90, speed: 125, role: "Sweeper" },
  { name: "Arceus", types: ["normal"], hp: 120, attack: 120, defense: 120, spAttack: 120, spDefense: 120, speed: 120, role: "Balanced" },
  { name: "Victini", types: ["psychic", "fire"], hp: 100, attack: 100, defense: 100, spAttack: 100, spDefense: 100, speed: 100, role: "Balanced" },
  { name: "Serperior", types: ["grass"], hp: 75, attack: 75, defense: 95, spAttack: 75, spDefense: 95, speed: 113, role: "Support" },
  { name: "Emboar", types: ["fire", "fighting"], hp: 110, attack: 123, defense: 65, spAttack: 100, spDefense: 65, speed: 65, role: "Tank" },
  { name: "Rotom", types: ["electric", "ghost"], hp: 50, attack: 50, defense: 77, spAttack: 95, spDefense: 77, speed: 91, role: "Support" },
  { name: "Heatran", types: ["fire", "steel"], hp: 91, attack: 90, defense: 106, spAttack: 130, spDefense: 106, speed: 77, role: "Wall" },
  { name: "Crobat", types: ["poison", "flying"], hp: 85, attack: 90, defense: 80, spAttack: 70, spDefense: 80, speed: 130, role: "Sweeper" },
  { name: "Skarmory", types: ["steel", "flying"], hp: 65, attack: 80, defense: 140, spAttack: 40, spDefense: 70, speed: 70, role: "Wall" },
  { name: "Blissey", types: ["normal"], hp: 255, attack: 10, defense: 10, spAttack: 75, spDefense: 135, speed: 55, role: "Support" },
  { name: "Umbreon", types: ["dark"], hp: 95, attack: 65, defense: 110, spAttack: 60, spDefense: 130, speed: 65, role: "Wall" }
];

// Type effectiveness chart
const typeChart = {
  fire: { strong: ['grass', 'ice', 'bug', 'steel'], weak: ['water', 'ground', 'rock'], resist: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immune: [] },
  water: { strong: ['fire', 'ground', 'rock'], weak: ['electric', 'grass'], resist: ['fire', 'water', 'ice', 'steel'], immune: [] },
  grass: { strong: ['water', 'ground', 'rock'], weak: ['fire', 'ice', 'poison', 'flying', 'bug'], resist: ['water', 'electric', 'grass', 'ground'], immune: [] },
  electric: { strong: ['water', 'flying'], weak: ['ground'], resist: ['electric', 'flying', 'steel'], immune: [] },
  psychic: { strong: ['fighting', 'poison'], weak: ['bug', 'ghost', 'dark'], resist: ['fighting', 'psychic'], immune: [] },
  ice: { strong: ['grass', 'ground', 'flying', 'dragon'], weak: ['fire', 'fighting', 'rock', 'steel'], resist: ['ice'], immune: [] },
  dragon: { strong: ['dragon'], weak: ['ice', 'dragon', 'fairy'], resist: ['fire', 'water', 'electric', 'grass'], immune: [] },
  dark: { strong: ['psychic', 'ghost'], weak: ['fighting', 'bug', 'fairy'], resist: ['ghost', 'dark'], immune: ['psychic'] },
  fighting: { strong: ['normal', 'ice', 'rock', 'dark', 'steel'], weak: ['flying', 'psychic', 'fairy'], resist: ['bug', 'rock', 'dark'], immune: ['ghost'] },
  poison: { strong: ['grass', 'fairy'], weak: ['ground', 'psychic'], resist: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immune: [] },
  ground: { strong: ['fire', 'electric', 'poison', 'rock', 'steel'], weak: ['water', 'grass', 'ice'], resist: ['poison', 'rock'], immune: ['electric'] },
  flying: { strong: ['grass', 'fighting', 'bug'], weak: ['electric', 'ice', 'rock'], resist: ['grass', 'fighting', 'bug'], immune: ['ground'] },
  bug: { strong: ['grass', 'psychic', 'dark'], weak: ['fire', 'flying', 'rock'], resist: ['grass', 'fighting', 'ground'], immune: [] },
  rock: { strong: ['fire', 'ice', 'flying', 'bug'], weak: ['water', 'grass', 'fighting', 'ground', 'steel'], resist: ['normal', 'fire', 'poison', 'flying'], immune: [] },
  ghost: { strong: ['psychic', 'ghost'], weak: ['ghost', 'dark'], resist: ['poison', 'bug'], immune: ['normal', 'fighting'] },
  steel: { strong: ['ice', 'rock', 'fairy'], weak: ['fire', 'fighting', 'ground'], resist: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immune: ['poison'] },
  fairy: { strong: ['fighting', 'dragon', 'dark'], weak: ['poison', 'steel'], resist: ['fighting', 'bug', 'dark'], immune: ['dragon'] },
  normal: { strong: [], weak: ['fighting'], resist: [], immune: ['ghost'] }
};

// Type colors
const typeColors = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC'
};

// Header Component
const Header = () => (
  <div className="text-center mb-10 text-white">
    <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">⚡ Pokemon Team Optimizer Pro ⚡</h1>
    <p className="text-xl opacity-90">Advanced team building with battle simulation and comprehensive analysis!</p>
  </div>
);

// Pokemon Card Component
const PokemonCard = ({ pokemon, isSelected, isRecommended, isDisabled, onClick, currentMode, showTeamLabel = false }) => {
  const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                    pokemon.spAttack + pokemon.spDefense + pokemon.speed;

  let cardClass = "bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 relative";
  
  if (isSelected) {
    cardClass += currentMode === 'opponent' 
      ? " border-red-500 bg-gradient-to-br from-red-500 to-red-600 text-white"
      : " border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 text-white";
  }
  if (isRecommended && !isSelected) cardClass += " border-green-500 shadow-green-200 ring-2 ring-green-300";
  if (isDisabled) cardClass += " opacity-50 cursor-not-allowed";

  return (
    <div className={cardClass} onClick={!isDisabled ? onClick : undefined}>
      {isRecommended && !isSelected && (
        <div className="absolute top-2 right-2 text-green-500 text-xl animate-pulse">⭐</div>
      )}
      {showTeamLabel && isSelected && (
        <div className="absolute top-2 left-2 text-xs font-bold bg-white/20 px-2 py-1 rounded">
          {currentMode === 'opponent' ? 'OPPONENT' : 'YOUR TEAM'}
        </div>
      )}
      <div className="font-bold text-lg mb-2">{pokemon.name}</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {pokemon.types.map(type => (
          <span 
            key={type}
            className="px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: typeColors[type] }}
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="text-sm leading-relaxed">
        <div>HP: {pokemon.hp} | ATK: {pokemon.attack} | DEF: {pokemon.defense}</div>
        <div>SP.ATK: {pokemon.spAttack} | SP.DEF: {pokemon.spDefense} | SPD: {pokemon.speed}</div>
        <div className="font-bold mt-1">Total: {totalStats}</div>
      </div>
      <div className="mt-2 inline-block bg-indigo-100 text-indigo-600 px-2 py-1 rounded-lg text-xs font-bold">
        {pokemon.role}
      </div>
    </div>
  );
};

// Team Pokemon Card Component
const TeamPokemonCard = ({ pokemon, isOpponent = false, onRemove }) => {
  const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                    pokemon.spAttack + pokemon.spDefense + pokemon.speed;

  const gradientClass = isOpponent 
    ? "bg-gradient-to-br from-red-500 to-red-600"
    : "bg-gradient-to-br from-cyan-500 to-blue-600";

  return (
    <div className={`${gradientClass} text-white rounded-xl p-5 shadow-lg relative group`}>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
      <div className="absolute top-3 right-3 bg-white/20 px-2 py-1 rounded-lg text-sm font-bold">
        {pokemon.role}
      </div>
      <div className="font-bold text-xl mb-3">{pokemon.name}</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {pokemon.types.map(type => (
          <span 
            key={type}
            className="px-2 py-1 rounded-full text-xs font-bold bg-white/30"
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="text-sm leading-relaxed">
        <div>HP: {pokemon.hp} | ATK: {pokemon.attack} | DEF: {pokemon.defense}</div>
        <div>SP.ATK: {pokemon.spAttack} | SP.DEF: {pokemon.spDefense} | SPD: {pokemon.speed}</div>
        <div className="font-bold mt-1">Total: {totalStats}</div>
      </div>
    </div>
  );
};

// Filters Component  
const PokemonFilters = ({ filters, setFilters }) => (
  <div className="flex flex-wrap gap-4 mb-6 items-end">
    <div className="flex flex-col">
      <label className="font-bold text-sm text-gray-600 mb-1">Filter by Type:</label>
      <select 
        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
        value={filters.type}
        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
      >
        <option value="">All Types</option>
        {Object.keys(typeChart).map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
    
    <div className="flex flex-col">
      <label className="font-bold text-sm text-gray-600 mb-1">Min Total Stats:</label>
      <input
        type="range"
        min="200"
        max="800"
        value={filters.minStats}
        onChange={(e) => setFilters(prev => ({ ...prev, minStats: parseInt(e.target.value) }))}
        className="w-32"
      />
      <span className="text-xs text-gray-500 text-center">{filters.minStats}</span>
    </div>
    
    <div className="flex flex-col">
      <label className="font-bold text-sm text-gray-600 mb-1">Search Pokemon:</label>
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.search}
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none w-48"
      />
    </div>
    
    <button
      onClick={() => setFilters({ type: '', minStats: 300, search: '' })}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
    >
      Clear Filters
    </button>
  </div>
);

// Mode Selector Component
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

// Team Display Component
const TeamDisplay = ({ selectedOpponent, selectedPlayer, onRemove }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {/* Opponent Team */}
    {selectedOpponent.length > 0 && (
      <div>
        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <span>🔴</span>
          Opponent Team ({selectedOpponent.length}/3)
        </h3>
        <div className="grid gap-3">
          {selectedOpponent.map((pokemon, index) => (
            <TeamPokemonCard 
              key={index} 
              pokemon={pokemon} 
              isOpponent={true}
              onRemove={() => onRemove('opponent', pokemon.name)}
            />
          ))}
        </div>
      </div>
    )}

    {/* Player Team */}
    {selectedPlayer.length > 0 && (
      <div>
        <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <span>🔵</span>
          Your Team ({selectedPlayer.length}/6)
        </h3>
        <div className="grid gap-3">
          {selectedPlayer.map((pokemon, index) => (
            <TeamPokemonCard 
              key={index} 
              pokemon={pokemon} 
              isOpponent={false}
              onRemove={() => onRemove('player', pokemon.name)}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

// Auto-Optimization Controls Component
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

// Team Analysis Component
const TeamAnalysis = ({ analysis, typeCoverage }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
    <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-purple-500 pb-3">
      📊 Team Analysis
    </h2>

    {/* Key Metrics */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 text-center">
        <div className="text-3xl font-bold">{analysis.avgStats}</div>
        <div className="text-sm mt-1">Avg Stats</div>
      </div>
      
      <div className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl p-6 text-center">
        <div className="text-3xl font-bold">{analysis.offensiveCoverage}%</div>
        <div className="text-sm mt-1">Offensive Coverage</div>
      </div>
      
      <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl p-6 text-center">
        <div className="text-3xl font-bold">{analysis.defensiveRating}%</div>
        <div className="text-sm mt-1">Defensive Rating</div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl p-6 text-center">
        <div className="text-3xl font-bold">{analysis.roleBalance}%</div>
        <div className="text-sm mt-1">Role Balance</div>
      </div>
    </div>

    {/* Type Coverage Grid */}
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Type Coverage Analysis</h3>
      <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
        {typeCoverage.map(({ type, status }) => (
          <div
            key={type}
            className={`p-3 rounded-lg text-center text-sm font-bold ${
              status === 'strong' 
                ? 'bg-green-500 text-white' 
                : status === 'weak'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Strong Against</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"> </div>
            <span>Weak Against</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span>Neutral</span>
        </div>
      </div>
    </div>

    {/* Detailed Recommendations */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-3">🔥 Strengths</h4>
        <div className="space-y-2">
          {analysis.strengths.map((strength, index) => (
            <div key={index} className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
              {strength}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-3">⚠️ Weaknesses</h4>
        <div className="space-y-2">
          {analysis.weaknesses.map((weakness, index) => (
            <div key={index} className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
              {weakness}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Battle Simulation Component
const BattleSimulation = ({ playerTeam, opponentTeam }) => {
  const [battleResult, setBattleResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateBattle = () => {
    if (playerTeam.length === 0 || opponentTeam.length === 0) return;
    
    setIsSimulating(true);
    
    // Simulate battle after delay for effect
    setTimeout(() => {
      let playerScore = 0;
      let opponentScore = 0;
      const matchups = [];

      // Calculate type advantages for each matchup
      opponentTeam.forEach((oppPokemon, oppIndex) => {
        let bestPlayerScore = 0;
        let bestPlayerPokemon = null;
        
        playerTeam.forEach(playerPokemon => {
          let advantage = 1;
          
          // Calculate type effectiveness
          playerPokemon.types.forEach(playerType => {
            oppPokemon.types.forEach(oppType => {
              if (typeChart[playerType]?.strong?.includes(oppType)) {
                advantage *= 2;
              } else if (typeChart[playerType]?.weak?.includes(oppType)) {
                advantage *= 0.5;
              }
            });
          });
          
          // Factor in stats
          const playerTotal = playerPokemon.attack + playerPokemon.spAttack + playerPokemon.speed;
          const score = playerTotal * advantage;
          
          if (score > bestPlayerScore) {
            bestPlayerScore = score;
            bestPlayerPokemon = playerPokemon;
          }
        });
        
        const oppTotal = oppPokemon.attack + oppPokemon.spAttack + oppPokemon.speed;
        
        if (bestPlayerScore > oppTotal * 1.2) {
          playerScore += 2;
          matchups.push({
            player: bestPlayerPokemon.name,
            opponent: oppPokemon.name,
            result: 'win',
            advantage: Math.round((bestPlayerScore / oppTotal) * 100) / 100
          });
        } else if (bestPlayerScore > oppTotal * 0.8) {
          playerScore += 1;
          opponentScore += 1;
          matchups.push({
            player: bestPlayerPokemon.name,
            opponent: oppPokemon.name,
            result: 'close',
            advantage: Math.round((bestPlayerScore / oppTotal) * 100) / 100
          });
        } else {
          opponentScore += 2;
          matchups.push({
            player: bestPlayerPokemon.name,
            opponent: oppPokemon.name,
            result: 'loss',
            advantage: Math.round((bestPlayerScore / oppTotal) * 100) / 100
          });
        }
      });

      setBattleResult({
        playerScore,
        opponentScore,
        winRate: Math.round((playerScore / (playerScore + opponentScore)) * 100),
        matchups
      });
      setIsSimulating(false);
    }, 2000);
  };

  if (playerTeam.length === 0 || opponentTeam.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">⚔️</div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">Battle Simulation</h3>
        <p className="text-gray-500">Select both your team and opponent team to simulate battles</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
        ⚔️ Battle Simulation
      </h3>

      <button
        onClick={simulateBattle}
        disabled={isSimulating}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 mb-6 flex items-center justify-center gap-2"
      >
        {isSimulating ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Simulating Battle...
          </>
        ) : (
          '🎮 Simulate Battle'
        )}
      </button>

      {battleResult && (
        <div className="space-y-6">
          {/* Battle Result Summary */}
          <div className="bg-white rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2">
                {battleResult.winRate >= 70 ? '🏆' : battleResult.winRate >= 50 ? '⚖️' : '💀'}
              </div>
              <div className="text-2xl font-bold">
                Win Rate: {battleResult.winRate}%
              </div>
              <div className="text-lg text-gray-600">
                Score: {battleResult.playerScore} - {battleResult.opponentScore}
              </div>
            </div>
          </div>

          {/* Detailed Matchups */}
          <div>
            <h4 className="text-lg font-bold mb-4">Matchup Analysis</h4>
            <div className="space-y-3">
              {battleResult.matchups.map((matchup, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    matchup.result === 'win'
                      ? 'bg-green-50 border-green-200'
                      : matchup.result === 'loss'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold">
                      {matchup.player} vs {matchup.opponent}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Advantage: {matchup.advantage}x
                      </span>
                      <div className="text-xl">
                        {matchup.result === 'win' ? '✅' : matchup.result === 'loss' ? '❌' : '⚖️'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const PokemonTeamOptimizer = () => {
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState([]);
  const [currentMode, setCurrentMode] = useState('opponent');
  const [filters, setFilters] = useState({ type: '', minStats: 300, search: '' });
  const [weights, setWeights] = useState({ offense: 3, defense: 3, stats: 10 });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  // Filter Pokemon based on current filters
  const filteredPokemon = useMemo(() => {
    return pokemonData.filter(pokemon => {
      const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                        pokemon.spAttack + pokemon.spDefense + pokemon.speed;
      
      const matchesType = !filters.type || pokemon.types.includes(filters.type);
      const matchesStats = totalStats >= filters.minStats;
      const matchesSearch = !filters.search || 
        pokemon.name.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesStats && matchesSearch;
    });
  }, [filters]);

  // Calculate team analysis
  const teamAnalysis = useMemo(() => {
    if (selectedPlayer.length === 0) {
      return {
        avgStats: 0,
        offensiveCoverage: 0,
        defensiveRating: 0,
        roleBalance: 0,
        strengths: [],
        weaknesses: []
      };
    }

    const totalStats = selectedPlayer.reduce((sum, p) => 
      sum + p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed, 0
    );
    const avgStats = Math.round(totalStats / selectedPlayer.length);

    // Calculate offensive coverage
    const coveredTypes = new Set();
    selectedPlayer.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeChart[type]?.strong?.forEach(strongType => coveredTypes.add(strongType));
      });
    });
    const offensiveCoverage = Math.round((coveredTypes.size / Object.keys(typeChart).length) * 100);

    // Calculate defensive rating
    const resistances = new Set();
    selectedPlayer.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeChart[type]?.resist?.forEach(resistType => resistances.add(resistType));
      });
    });
    const defensiveRating = Math.round((resistances.size / Object.keys(typeChart).length) * 100);

    // Role balance
    const roles = selectedPlayer.map(p => p.role);
    const uniqueRoles = new Set(roles).size;
    const roleBalance = Math.round((uniqueRoles / 5) * 100); // Assuming 5 main roles

    // Generate strengths and weaknesses
    const strengths = [];
    const weaknesses = [];

    if (avgStats > 400) strengths.push("High average stats across the team");
    if (offensiveCoverage > 60) strengths.push("Excellent type coverage for offense");
    if (defensiveRating > 50) strengths.push("Good defensive synergy");
    if (uniqueRoles >= 4) strengths.push("Well-balanced team roles");

    if (avgStats < 350) weaknesses.push("Below-average stat distribution");
    if (offensiveCoverage < 40) weaknesses.push("Limited offensive type coverage");
    if (defensiveRating < 30) weaknesses.push("Vulnerable to common attack types");
    if (uniqueRoles < 3) weaknesses.push("Lacks role diversity");

    return {
      avgStats,
      offensiveCoverage,
      defensiveRating,
      roleBalance,
      strengths: strengths.length > 0 ? strengths : ["Team composition is balanced"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["No major weaknesses detected"]
    };
  }, [selectedPlayer]);

  // Calculate type coverage
  const typeCoverage = useMemo(() => {
    const allTypes = Object.keys(typeChart);
    return allTypes.map(type => {
      let status = 'neutral';
      
      // Check if we have strong attacks against this type
      const hasStrongAttack = selectedPlayer.some(pokemon =>
        pokemon.types.some(pType => typeChart[pType]?.strong?.includes(type))
      );
      
      // Check if we're weak to this type
      const isWeakTo = selectedPlayer.some(pokemon =>
        pokemon.types.some(pType => typeChart[type]?.strong?.includes(pType))
      );
      
      if (hasStrongAttack) status = 'strong';
      else if (isWeakTo) status = 'weak';
      
      return { type, status };
    });
  }, [selectedPlayer]);

  // Generate recommendations based on opponent team
  const generateRecommendations = useCallback(() => {
    if (selectedOpponent.length === 0) {
      setRecommendations([]);
      return;
    }

    const opponentTypes = new Set();
    selectedOpponent.forEach(pokemon => {
      pokemon.types.forEach(type => opponentTypes.add(type));
    });

    const scored = pokemonData
      .filter(p => !selectedPlayer.some(sp => sp.name === p.name))
      .map(pokemon => {
        let score = 0;
        
        // Type advantage scoring
        pokemon.types.forEach(type => {
          opponentTypes.forEach(oppType => {
            if (typeChart[type]?.strong?.includes(oppType)) {
              score += weights.offense * 10;
            }
            if (typeChart[type]?.resist?.includes(oppType)) {
              score += weights.defense * 5;
            }
          });
        });
        
        // Stats scoring
        const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                          pokemon.spAttack + pokemon.spDefense + pokemon.speed;
        score += (totalStats / 100) * weights.stats;
        
        return { pokemon, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.pokemon.name);

    setRecommendations(scored);
  }, [selectedOpponent, selectedPlayer, weights.offense, weights.defense, weights.stats]);

  // Auto-optimize team
  const optimizeTeam = useCallback(() => {
    if (selectedOpponent.length === 0) return;
    
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => {
      const opponentTypes = new Set();
      selectedOpponent.forEach(pokemon => {
        pokemon.types.forEach(type => opponentTypes.add(type));
      });

      const scored = pokemonData.map(pokemon => {
        let score = 0;
        
        pokemon.types.forEach(type => {
          opponentTypes.forEach(oppType => {
            if (typeChart[type]?.strong?.includes(oppType)) {
              score += weights.offense * 15;
            }
            if (typeChart[type]?.resist?.includes(oppType)) {
              score += weights.defense * 10;
            }
          });
        });
        
        const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                          pokemon.spAttack + pokemon.spDefense + pokemon.speed;
        score += (totalStats / 100) * weights.stats;
        
        return { pokemon, score };
      });

      // Select top Pokemon with role diversity
      const optimized = [];
      const usedRoles = new Set();
      
      scored
        .sort((a, b) => b.score - a.score)
        .forEach(({ pokemon }) => {
          if (optimized.length < 6) {
            if (!usedRoles.has(pokemon.role) || optimized.length >= 4) {
              optimized.push(pokemon);
              usedRoles.add(pokemon.role);
            }
          }
        });

      setSelectedPlayer(optimized.slice(0, 6));
      setIsOptimizing(false);
      setOptimizationProgress(0);
    }, 2500);
  }, [selectedOpponent, weights]);

  // Handle Pokemon selection
  const handlePokemonSelect = useCallback((pokemon) => {
    if (currentMode === 'opponent') {
      setSelectedOpponent(prev => {
        if (prev.some(p => p.name === pokemon.name)) {
          return prev.filter(p => p.name !== pokemon.name);
        }
        return prev.length < 3 ? [...prev, pokemon] : prev;
      });
    } else {
      setSelectedPlayer(prev => {
        if (prev.some(p => p.name === pokemon.name)) {
          return prev.filter(p => p.name !== pokemon.name);
        }
        return prev.length < 6 ? [...prev, pokemon] : prev;
      });
    }
  }, [currentMode]);

  // Remove Pokemon from team
  const removePokemon = useCallback((mode, pokemonName) => {
    if (mode === 'opponent') {
      setSelectedOpponent(prev => prev.filter(p => p.name !== pokemonName));
    } else {
      setSelectedPlayer(prev => prev.filter(p => p.name !== pokemonName));
    }
  }, []);

  // Clear team
  const clearTeam = useCallback(() => {
    setSelectedPlayer([]);
  }, []);

  // Update recommendations when opponent changes
 useEffect(() => {
  generateRecommendations();
}, [selectedOpponent, selectedPlayer, weights]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <ModeSelector 
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          selectedOpponent={selectedOpponent}
          selectedPlayer={selectedPlayer}
        />
        
        <TeamDisplay 
          selectedOpponent={selectedOpponent}
          selectedPlayer={selectedPlayer}
          onRemove={removePokemon}
        />

        <OptimizationControls
          weights={weights}
          setWeights={setWeights}
          optimizeTeam={optimizeTeam}
          isOptimizing={isOptimizing}
          optimizationProgress={optimizationProgress}
          clearTeam={clearTeam}
          selectedOpponent={selectedOpponent}
        />

        {selectedPlayer.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <TeamAnalysis analysis={teamAnalysis} typeCoverage={typeCoverage} />
            <BattleSimulation playerTeam={selectedPlayer} opponentTeam={selectedOpponent} />
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            {currentMode === 'opponent' ? '🔴 Select Opponent Pokemon' : '🔵 Build Your Team'}
          </h2>
          
          <PokemonFilters filters={filters} setFilters={setFilters} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                isSelected={
                  currentMode === 'opponent' 
                    ? selectedOpponent.some(p => p.name === pokemon.name)
                    : selectedPlayer.some(p => p.name === pokemon.name)
                }
                isRecommended={
                  currentMode === 'player' && recommendations.includes(pokemon.name)
                }
                isDisabled={
  currentMode === 'opponent' 
    ? selectedOpponent.length >= 3 && !selectedOpponent.some(p => p.name === pokemon.name)
    : selectedPlayer.length >= 6 && !selectedPlayer.some(p => p.name === pokemon.name)
}
                onClick={() => handlePokemonSelect(pokemon)}
                currentMode={currentMode}
                showTeamLabel={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTeamOptimizer;
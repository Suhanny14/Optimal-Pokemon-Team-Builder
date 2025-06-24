import React from 'react';
import TeamPokemonCard from './TeamPokemonCard';

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

export default TeamDisplay; 
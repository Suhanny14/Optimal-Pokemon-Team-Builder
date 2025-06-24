import React from 'react';
import { typeColors } from './pokeData';

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

export default PokemonCard; 
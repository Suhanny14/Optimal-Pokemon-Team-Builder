import React from 'react';

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

export default TeamPokemonCard; 
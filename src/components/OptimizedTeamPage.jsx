import React, { useEffect, useState } from 'react';
import TeamPokemonCard from './TeamPokemonCard';
import { useNavigate } from 'react-router-dom';

const OptimizedTeamPage = () => {
  const [optimizedTeam, setOptimizedTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const team = JSON.parse(localStorage.getItem('optimizedTeam') || '[]');
    setOptimizedTeam(team);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">🎉 Optimized Team</h1>
        {optimizedTeam.length === 0 ? (
          <div className="text-center text-lg">No optimized team found. Please run auto-optimize first.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {optimizedTeam.map((pokemon, idx) => (
              <TeamPokemonCard key={idx} pokemon={pokemon} />
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            onClick={() => navigate('/battle')}
          >
            Proceed to Battle Simulation
          </button>
          <button
            className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold hover:bg-gray-500"
            onClick={() => navigate('/')}
          >
            Back to Team Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizedTeamPage; 
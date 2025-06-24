import React, { useEffect, useState, useMemo } from 'react';
import TeamAnalysis from './TeamAnalysis';
import BattleSimulation from './BattleSimulation';
import { useNavigate } from 'react-router-dom';
import { typeChart } from './pokeData';

const BattlePage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem('selectedPlayer') || '[]');
    const opponent = JSON.parse(localStorage.getItem('selectedOpponent') || '[]');
    setSelectedPlayer(player);
    setSelectedOpponent(opponent);
  }, []);

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
    const coveredTypes = new Set();
    selectedPlayer.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeChart[type]?.strong?.forEach(strongType => coveredTypes.add(strongType));
      });
    });
    const offensiveCoverage = Math.round((coveredTypes.size / Object.keys(typeChart).length) * 100);
    const resistances = new Set();
    selectedPlayer.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeChart[type]?.resist?.forEach(resistType => resistances.add(resistType));
      });
    });
    const defensiveRating = Math.round((resistances.size / Object.keys(typeChart).length) * 100);
    const roles = selectedPlayer.map(p => p.role);
    const uniqueRoles = new Set(roles).size;
    const roleBalance = Math.round((uniqueRoles / 5) * 100);
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

  const typeCoverage = useMemo(() => {
    const allTypes = Object.keys(typeChart);
    return allTypes.map(type => {
      let status = 'neutral';
      const hasStrongAttack = selectedPlayer.some(pokemon =>
        pokemon.types.some(pType => typeChart[pType]?.strong?.includes(type))
      );
      const isWeakTo = selectedPlayer.some(pokemon =>
        pokemon.types.some(pType => typeChart[type]?.strong?.includes(pType))
      );
      if (hasStrongAttack) status = 'strong';
      else if (isWeakTo) status = 'weak';
      return { type, status };
    });
  }, [selectedPlayer]);

  if (selectedPlayer.length === 0 || selectedOpponent.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="bg-white/90 p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">No teams selected!</h2>
          <p className="mb-6">Please select your team and opponent team first.</p>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Go to Team Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">⚔️ Battle Simulation</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <TeamAnalysis analysis={teamAnalysis} typeCoverage={typeCoverage} />
          <BattleSimulation playerTeam={selectedPlayer} opponentTeam={selectedOpponent} />
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            ← Back to Team Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattlePage; 
import React, { useState } from 'react';
import { typeChart } from './pokeData';

const BattleSimulation = ({ playerTeam, opponentTeam }) => {
  const [battleResult, setBattleResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateBattle = () => {
    if (playerTeam.length === 0 || opponentTeam.length === 0) return;
    setIsSimulating(true);
    setTimeout(() => {
      let playerScore = 0;
      let opponentScore = 0;
      const matchups = [];
      opponentTeam.forEach((oppPokemon, oppIndex) => {
        let bestPlayerScore = 0;
        let bestPlayerPokemon = null;
        playerTeam.forEach(playerPokemon => {
          let advantage = 1;
          playerPokemon.types.forEach(playerType => {
            oppPokemon.types.forEach(oppType => {
              if (typeChart[playerType]?.strong?.includes(oppType)) {
                advantage *= 2;
              } else if (typeChart[playerType]?.weak?.includes(oppType)) {
                advantage *= 0.5;
              }
            });
          });
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

export default BattleSimulation; 
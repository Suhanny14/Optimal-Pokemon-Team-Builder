import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { pokemonData, typeChart } from './pokeData';
import Header from './Header';
import PokemonCard from './PokemonCard';
import TeamPokemonCard from './TeamPokemonCard';
import PokemonFilters from './PokemonFilters';
import ModeSelector from './ModeSelector';
import TeamDisplay from './TeamDisplay';
import OptimizationControls from './OptimizationControls';
import TeamAnalysis from './TeamAnalysis';
import BattleSimulation from './BattleSimulation';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleRefresh = () => {
    setSelectedPlayer([]);
    setSelectedOpponent([]);
    setCurrentMode('opponent');
    setFilters({ type: '', minStats: 300, search: '' });
    setWeights({ offense: 3, defense: 3, stats: 10 });
    setIsOptimizing(false);
    setOptimizationProgress(0);
    setRecommendations([]);
  };

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
      setIsOptimizing(false);
      setOptimizationProgress(0);
      setSelectedPlayer(optimized.slice(0, 6));
      localStorage.setItem('optimizedTeam', JSON.stringify(optimized.slice(0, 6)));
      navigate('/optimized');
    }, 2500);
  }, [selectedOpponent, weights, navigate]);

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

  const handleProceedToBattle = () => {
    localStorage.setItem('selectedPlayer', JSON.stringify(selectedPlayer));
    localStorage.setItem('selectedOpponent', JSON.stringify(selectedOpponent));
    navigate('/battle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg shadow transition-all text-lg"
          >
            🔄 Refresh
          </button>
        </div>
        
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

        {selectedPlayer.length > 0 && selectedOpponent.length > 0 && (
          <div className="flex justify-center mb-8">
            <button
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xl shadow-lg transition-all"
              onClick={handleProceedToBattle}
            >
              Proceed to Battle Simulation →
            </button>
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
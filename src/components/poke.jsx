import React, { useState, useEffect, useMemo } from 'react';

const PokemonTeamOptimizer = () => {
  // Enhanced Pokemon dataset with roles and moves
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

  // Enhanced type effectiveness chart
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

  // State management
  const [selectedOpponent, setSelectedOpponent] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [currentMode, setCurrentMode] = useState('opponent');
  const [filters, setFilters] = useState({
    type: '',
    minStats: 300,
    search: ''
  });
  const [weights, setWeights] = useState({
    offense: 2,
    defense: 1,
    stats: 10
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [battleResults, setBattleResults] = useState(null);

  // Filter Pokemon based on current filters
  const filteredPokemon = useMemo(() => {
    return pokemonData.filter(pokemon => {
      const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                        pokemon.spAttack + pokemon.spDefense + pokemon.speed;
      
      const matchesType = !filters.type || pokemon.types.includes(filters.type);
      const matchesStats = totalStats >= filters.minStats;
      const matchesSearch = !filters.search || pokemon.name.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesStats && matchesSearch;
    });
  }, [filters]);

  // Calculate Pokemon score for optimization
  const calculatePokemonScore = (pokemon, opponentTeam) => {
    let score = 0;

    // Offensive advantage
    opponentTeam.forEach(opponent => {
      pokemon.types.forEach(attackType => {
        opponent.types.forEach(defenseType => {
          if (typeChart[attackType]?.strong.includes(defenseType)) {
            score += 15 * weights.offense;
          }
        });
      });
    });

    // Defensive advantage
    opponentTeam.forEach(opponent => {
      opponent.types.forEach(attackType => {
        pokemon.types.forEach(defenseType => {
          if (typeChart[defenseType]?.resist.includes(attackType)) {
            score += 10 * weights.defense;
          }
          if (typeChart[defenseType]?.immune.includes(attackType)) {
            score += 20 * weights.defense;
          }
        });
      });
    });

    // Base stats
    const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                      pokemon.spAttack + pokemon.spDefense + pokemon.speed;
    score += (totalStats / 10) * (weights.stats / 10);

    // Role balance bonus
    const currentRoles = selectedPlayer.map(p => p.role);
    if (!currentRoles.includes(pokemon.role)) {
      score += 20;
    }

    return Math.min(score, 100);
  };

  // Handle Pokemon selection
  const selectPokemon = (pokemon) => {
    if (currentMode === 'opponent') {
      setSelectedOpponent(prev => {
        const index = prev.findIndex(p => p.name === pokemon.name);
        if (index > -1) {
          return prev.filter((_, i) => i !== index);
        } else if (prev.length < 3) {
          return [...prev, pokemon];
        }
        return prev;
      });
    } else {
      setSelectedPlayer(prev => {
        const index = prev.findIndex(p => p.name === pokemon.name);
        if (index > -1) {
          return prev.filter((_, i) => i !== index);
        } else if (prev.length < 6) {
          return [...prev, pokemon];
        }
        return prev;
      });
    }
  };

  // Optimize team using genetic algorithm simulation
  const optimizeTeam = async () => {
    if (selectedOpponent.length !== 3) return;

    setIsOptimizing(true);
    setOptimizationProgress(0);

    // Simulate optimization progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setOptimizationProgress(i);
    }

    // Score all Pokemon and select best team
    const scoredPokemon = pokemonData.map(pokemon => ({
      ...pokemon,
      score: calculatePokemonScore(pokemon, selectedOpponent)
    }));

    scoredPokemon.sort((a, b) => b.score - a.score);

    const optimizedTeam = [];
    const roles = ['Tank', 'Sweeper', 'Wall', 'Support', 'Balanced'];

    // First pass: get best of each role
    roles.forEach(role => {
      const bestOfRole = scoredPokemon.find(p => p.role === role && optimizedTeam.length < 6);
      if (bestOfRole && !optimizedTeam.some(tp => tp.name === bestOfRole.name)) {
        optimizedTeam.push(bestOfRole);
      }
    });

    // Second pass: fill remaining slots with highest scoring
    while (optimizedTeam.length < 6) {
      const next = scoredPokemon.find(p => !optimizedTeam.some(tp => tp.name === p.name));
      if (next) {
        optimizedTeam.push(next);
      } else {
        break;
      }
    }

    setSelectedPlayer(optimizedTeam);
    setIsOptimizing(false);
    setOptimizationProgress(0);
  };

  // Simulate battle
  const simulateBattle = () => {
    if (selectedPlayer.length !== 6 || selectedOpponent.length !== 3) return;

    let playerWins = 0;
    const battleLogs = [];

    // Run 100 simulated battles
    for (let i = 0; i < 100; i++) {
      const result = simulateSingleBattle();
      if (result.winner === 'player') {
        playerWins++;
      }
      
      if (i < 5) { // Log first 5 battles
        battleLogs.push(`Battle ${i + 1}: ${result.log}`);
      }
    }

    const winRate = playerWins;
    setBattleResults({
      winRate,
      playerWins,
      opponentWins: 100 - playerWins,
      logs: battleLogs
    });
  };

  const simulateSingleBattle = () => {
    let playerAdvantage = 0;

    // Calculate type advantages
    selectedPlayer.forEach(playerPoke => {
      selectedOpponent.forEach(opponentPoke => {
        let matchupScore = 0;
        
        // Player attacking opponent
        playerPoke.types.forEach(attackType => {
          opponentPoke.types.forEach(defenseType => {
            if (typeChart[attackType]?.strong.includes(defenseType)) {
              matchupScore += 2;
            } else if (typeChart[attackType]?.weak.includes(defenseType)) {
              matchupScore -= 1;
            }
          });
        });

        // Opponent attacking player (reverse)
        opponentPoke.types.forEach(attackType => {
          playerPoke.types.forEach(defenseType => {
            if (typeChart[attackType]?.strong.includes(defenseType)) {
              matchupScore -= 2;
            } else if (typeChart[attackType]?.weak.includes(defenseType)) {
              matchupScore += 1;
            }
          });
        });

        playerAdvantage += matchupScore;
      });
    });

    // Calculate stat advantages
    const playerAvgStats = selectedPlayer.reduce((sum, p) => 
      sum + (p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed), 0) / selectedPlayer.length;
    
    const opponentAvgStats = selectedOpponent.reduce((sum, p) => 
      sum + (p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed), 0) / selectedOpponent.length;

    playerAdvantage += (playerAvgStats - opponentAvgStats) / 50;

    // Add randomness
    const randomFactor = (Math.random() - 0.5) * 8;
    playerAdvantage += randomFactor;

    const winner = playerAdvantage > 0 ? 'player' : 'opponent';
    const log = `${winner === 'player' ? 'Victory' : 'Defeat'} (Score: ${playerAdvantage.toFixed(1)})`;

    return { winner, log };
  };

  // Calculate team analysis metrics
  const getTeamAnalysis = () => {
    if (selectedPlayer.length === 0) return null;

    const avgStats = selectedPlayer.reduce((sum, p) => sum + 
      (p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed), 0) / selectedPlayer.length;
    
    // Offensive coverage
    const allTypes = Object.keys(typeChart);
    let offensiveCoverage = 0;
    allTypes.forEach(targetType => {
      const hasAdvantage = selectedPlayer.some(pokemon => 
        pokemon.types.some(attackType => 
          typeChart[attackType]?.strong.includes(targetType)
        )
      );
      if (hasAdvantage) offensiveCoverage++;
    });

    // Defensive rating
    const threatTypes = [...new Set(selectedOpponent.flatMap(p => p.types))];
    let defensiveRating = 0;
    if (threatTypes.length > 0) {
      threatTypes.forEach(threatType => {
        const hasResistance = selectedPlayer.some(pokemon => 
          pokemon.types.some(defenseType => 
            typeChart[defenseType]?.resist.includes(threatType) ||
            typeChart[defenseType]?.immune.includes(threatType)
          )
        );
        if (hasResistance) defensiveRating++;
      });
      defensiveRating = (defensiveRating / threatTypes.length) * 100;
    } else {
      defensiveRating = 100;
    }

    // Role balance
    const roles = selectedPlayer.map(p => p.role);
    const uniqueRoles = new Set(roles).size;
    const roleBalance = (uniqueRoles / 5) * 100;

    return {
      avgStats: Math.round(avgStats),
      offensiveCoverage: Math.round((offensiveCoverage / allTypes.length) * 100),
      defensiveRating: Math.round(defensiveRating),
      roleBalance: Math.round(roleBalance)
    };
  };

  // Get type coverage grid
  const getTypeCoverage = () => {
    if (selectedPlayer.length === 0) return [];

    const allTypes = Object.keys(typeChart);
    return allTypes.map(type => {
      const hasAdvantage = selectedPlayer.some(pokemon => 
        pokemon.types.some(attackType => 
          typeChart[attackType]?.strong.includes(type)
        )
      );

      const hasWeakness = selectedOpponent.some(opponent =>
        opponent.types.some(attackType =>
          typeChart[attackType]?.strong.includes(type)
        )
      );

      let status = 'neutral';
      if (hasAdvantage) status = 'strong';
      else if (hasWeakness) status = 'weak';

      return { type, status };
    });
  };

  // Pokemon Card Component
  const PokemonCard = ({ pokemon, isSelected, isRecommended, isDisabled, onClick }) => {
    const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                      pokemon.spAttack + pokemon.spDefense + pokemon.speed;

    let cardClass = "bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 relative";
    
    if (isSelected) {
      cardClass += currentMode === 'opponent' 
        ? " border-red-500 bg-gradient-to-br from-red-500 to-red-600 text-white"
        : " border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 text-white";
    }
    if (isRecommended) cardClass += " border-green-500 shadow-green-200";
    if (isDisabled) cardClass += " opacity-50 cursor-not-allowed";

    return (
      <div className={cardClass} onClick={!isDisabled ? onClick : undefined}>
        {isRecommended && (
          <div className="absolute top-2 right-2 text-yellow-400 text-xl">⭐</div>
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
  const TeamPokemonCard = ({ pokemon, isOpponent = false }) => {
    const totalStats = pokemon.hp + pokemon.attack + pokemon.defense + 
                      pokemon.spAttack + pokemon.spDefense + pokemon.speed;

    const gradientClass = isOpponent 
      ? "bg-gradient-to-br from-red-500 to-red-600"
      : "bg-gradient-to-br from-cyan-500 to-blue-600";

    return (
      <div className={`${gradientClass} text-white rounded-xl p-5 shadow-lg relative`}>
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

  const analysis = getTeamAnalysis();
  const typeCoverage = getTypeCoverage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700 text-gray-800">
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <div className="text-center mb-10 text-white">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">⚡ Pokemon Team Optimizer Pro ⚡</h1>
          <p className="text-xl opacity-90">Advanced team building with battle simulation and comprehensive analysis!</p>
        </div>

        {/* Step 1: Opponent Selection */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-indigo-500 pb-3">
            Step 1: Set Opponent Team (3 Pokemon)
          </h2>
          
          {/* Mode Selector */}
          <div className="flex gap-3 mb-6">
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentMode === 'opponent' 
                  ? 'bg-indigo-500 text-white shadow-lg' 
                  : 'bg-white text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-50'
              }`}
              onClick={() => setCurrentMode('opponent')}
            >
              Select Opponent
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentMode === 'player' 
                  ? 'bg-indigo-500 text-white shadow-lg' 
                  : 'bg-white text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-50'
              } ${selectedOpponent.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => selectedOpponent.length > 0 && setCurrentMode('player')}
            >
              Build Your Team
            </button>
          </div>

          {/* Filters */}
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

          {/* Selected Teams Display */}
          {(selectedOpponent.length > 0 || selectedPlayer.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Opponent Team */}
              {selectedOpponent.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">
                    Opponent Team ({selectedOpponent.length}/3)
                  </h3>
                  <div className="grid gap-3">
                    {selectedOpponent.map((pokemon, index) => (
                      <TeamPokemonCard key={index} pokemon={pokemon} isOpponent={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Player Team */}
              {selectedPlayer.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    Your Team ({selectedPlayer.length}/6)
                  </h3>
                  <div className="grid gap-3">
                    {selectedPlayer.map((pokemon, index) => (
                      <TeamPokemonCard key={index} pokemon={pokemon} isOpponent={false} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pokemon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPokemon.map((pokemon) => {
              const isSelectedOpponent = selectedOpponent.some(p => p.name === pokemon.name);
              const isSelectedPlayer = selectedPlayer.some(p => p.name === pokemon.name);
              const isSelected = isSelectedOpponent || isSelectedPlayer;
              
              let isDisabled = false;
              if (currentMode === 'opponent' && selectedOpponent.length >= 3 && !isSelectedOpponent) {
                isDisabled = true;
              }
              if (currentMode === 'player' && selectedPlayer.length >= 6 && !isSelectedPlayer) {
                isDisabled = true;
              }

              const isRecommended = currentMode === 'player' && selectedOpponent.length > 0 && 
                calculatePokemonScore(pokemon, selectedOpponent) > 60;

              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  isSelected={isSelected}
                  isRecommended={isRecommended}
                  isDisabled={isDisabled}
                  onClick={() => selectPokemon(pokemon)}
                />
              );
            })}
          </div>
        </div>

        {/* Step 2: Team Building Tools */}
        {selectedOpponent.length === 3 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-green-500 pb-3">
              Step 2: Build Your Team (6 Pokemon)
            </h2>

            {/* Optimization Controls */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Auto-Optimization Settings</h3>
              
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
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={optimizeTeam}
                  disabled={isOptimizing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isOptimizing ? 'Optimizing...' : '🧠 Auto-Optimize Team'}
                </button>
                
                <button
                  onClick={() => setSelectedPlayer([])}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Clear Team
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
                    Analyzing combinations... {optimizationProgress}%
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Team Analysis */}
        {selectedPlayer.length > 0 && analysis && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-purple-500 pb-3">
              Step 3: Team Analysis
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
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Weak Against</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Neutral</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Battle Simulation */}
        {selectedPlayer.length === 6 && selectedOpponent.length === 3 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-yellow-500 pb-3">
              Step 4: Battle Simulation
            </h2>

            <div className="text-center mb-6">
              <button
                onClick={simulateBattle}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg transform hover:scale-105"
              >
                ⚔️ Simulate Battle (100 rounds)
              </button>
            </div>

            {battleResults && (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold">{battleResults.winRate}%</div>
                    <div className="text-lg mt-1">Win Rate</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold">{battleResults.playerWins}</div>
                    <div className="text-lg mt-1">Victories</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold">{battleResults.opponentWins}</div>
                    <div className="text-lg mt-1">Defeats</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">Sample Battle Logs:</h3>
                  <div className="space-y-2">
                    {battleResults.logs.map((log, index) => (
                      <div key={index} className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonTeamOptimizer;
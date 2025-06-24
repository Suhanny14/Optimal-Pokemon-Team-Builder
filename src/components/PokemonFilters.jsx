import React from 'react';
import { typeChart } from './pokeData';

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

export default PokemonFilters; 
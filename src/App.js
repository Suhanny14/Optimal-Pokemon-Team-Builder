import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonTeamOptimizer from './components/poke1';
import BattlePage from './components/BattlePage';
import OptimizedTeamPage from './components/OptimizedTeamPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PokemonTeamOptimizer />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/optimized" element={<OptimizedTeamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
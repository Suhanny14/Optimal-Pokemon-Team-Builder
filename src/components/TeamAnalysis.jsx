import React from 'react';

const TeamAnalysis = ({ analysis, typeCoverage }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
    <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-purple-500 pb-3">
      📊 Team Analysis
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
          <div className="w-4 h-4 bg-red-500 rounded"> </div>
            <span>Weak Against</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span>Neutral</span>
        </div>
      </div>
    </div>
    {/* Detailed Recommendations */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-3">🔥 Strengths</h4>
        <div className="space-y-2">
          {analysis.strengths.map((strength, index) => (
            <div key={index} className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
              {strength}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-3">⚠️ Weaknesses</h4>
        <div className="space-y-2">
          {analysis.weaknesses.map((weakness, index) => (
            <div key={index} className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
              {weakness}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TeamAnalysis; 
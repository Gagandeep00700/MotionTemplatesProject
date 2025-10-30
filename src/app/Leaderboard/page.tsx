"use client";
import { useState } from "react";

// --- SVG Icon Components ---
// Using inline SVGs as requested

/**
 * Trophy Icon
 */
const TrophyIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

/**
 * Plus Icon
 */
const PlusIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

// --- Mock Data ---
// This data simulates the contributors shown in the image.
const contributorsData = [
  {
    id: 1,
    rank: 1,
    name: 'Gagandeep',
    points: '12,600',
    avatar: 'https://placehold.co/100x100/EAB308/FFFFFF?text=G&font=inter',
    rankType: 'gold',
    badges: ['#F9A825', '#FF6B6B', '#4ECDC4', '#45B7D1', '#9B59B6'],
  },
  {
    id: 2,
    name: 'Gagandeep',
    rank: 2,
    points: '12,600',
    avatar: 'https://placehold.co/100x100/C0C0C0/FFFFFF?text=G&font=inter',
    rankType: 'silver',
    badges: ['#4ECDC4', '#57E049', '#45B7D1', '#9B59B6'],
  },
  {
    id: 3,
    name: 'Trendsetter',
    rank: 3,
    points: '12,500',
    avatar: 'https://placehold.co/100x100/CD7F32/FFFFFF?text=T&font=inter',
    rankType: 'bronze',
    badges: ['#45B7D1', '#F9A825', '#FF6B6B', '#4ECDC4', '#9B59B6'],
  },
  {
    id: 4,
    name: 'Gagandeep',
    rank: 4,
    points: '12,600',
    avatar: 'https://placehold.co/100x100/6D28D9/FFFFFF?text=G&font=inter',
    rankType: 'default',
    badges: ['#4ECDC4', '#F9A825', '#9B59B6'],
  },
  {
    id: 5,
    name: 'Snodlek',
    rank: 5,
    points: '39,600',
    avatar: 'https://placehold.co/100x100/D946EF/FFFFFF?text=S&font=inter',
    rankType: 'default',
    badges: [],
  },
];

// --- Main App Component ---
// This would be your page component in Next.js
export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('All Time');
  const tabs = ['Daily', 'Weekly', 'Monthly', 'All Time'];

  // Helper to get border color based on rank
  const getRankClasses = (rankType:string) => {
    switch (rankType) {
      case 'gold':
        return 'border-yellow-400';
      case 'silver':
        return 'border-gray-400';
      case 'bronze':
        return 'border-yellow-700';
      default:
        return 'border-transparent';
    }
  };

  return (
    // Page container with dark background
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900 p-4 font-inter text-white">
      
      {/* Leaderboard Card */}
      <div className="w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-8 shadow-2xl">
        
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Top Contributors</h1>

        {/* Time Tabs */}
        <div className="flex items-center space-x-2 md:space-x-4 mb-6 bg-gray-900/50 p-1.5 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 md:px-5 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-md' 
                  : 'text-gray-300 hover:text-white'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contributors List */}
        <div className="space-y-4">
          {contributorsData.map((user) => (
            <div 
              key={user.id}
              className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              {/* Rank */}
              <span className="text-3xl md:text-4xl font-bold text-gray-400 w-12 text-center">
                {String(user.rank).padStart(2, '0')}
              </span>

              {/* Avatar and Name */}
              <div className="flex-shrink-0">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 object-cover ${getRankClasses(user.rankType)}`}
                />
              </div>
              <span className="text-base md:text-lg font-semibold w-32 md:w-48 truncate">{user.name}</span>

              {/* Points */}
              <div className="hidden md:flex items-center space-x-2 text-gray-300">
                <TrophyIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-sm md:text-base font-medium">{user.points} points</span>
              </div>
              
              {/* Badges */}
              <div className="flex-1 hidden lg:flex items-center space-x-2">
                {user.badges.map((badgeColor, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: badgeColor }}
                    title={`Badge ${index + 1}`}
                  ></div>
                ))}
              </div>

              {/* Follow Button (Conditional) */}
              {user.rank > 3 && (
                <button className="flex items-center space-x-2 ml-auto bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-full transition-colors duration-200">
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Follow</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import DailyVerseCard from '../components/DailyVerseCard';
import PillarsSection from '../components/PillarsSection';

const Dashboard: React.FC = () => {
  const isFriday = new Date().getDay() === 5;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-purple-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold serif italic mb-2">Welcome to your Lenten Journey</h2>
          <p className="text-purple-100 text-sm opacity-90 max-w-xs">
            "Return to me with all your heart, with fasting, with weeping, and with mourning." — Joel 2:12
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="text-9xl">✝️</span>
        </div>
      </div>

      {/* Friday Abstinence Reminder */}
      {isFriday && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🐟</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider">Friday Abstinence</h3>
              <p className="text-sm text-red-700">
                Today is Friday. Remember to abstain from meat in penance for the Passion of our Lord.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Daily Scripture */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-purple-900 px-2 flex items-center gap-2">
          <span>📜</span> Daily Bread
        </h2>
        <DailyVerseCard />
      </section>

      {/* Three Pillars Section */}
      <PillarsSection />

      {/* Secondary Focus Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm border-t-4 border-t-purple-700">
          <h3 className="text-md font-bold text-purple-900 mb-2 flex items-center gap-2">
            <span>✨</span> Today's Focus
          </h3>
          <p className="text-gray-600 text-sm italic">
            "Silence is the language of God. Try to find 10 minutes of complete silence today to listen to His voice."
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm border-t-4 border-t-purple-400">
          <h3 className="text-md font-bold text-purple-900 mb-2 flex items-center gap-2">
            <span>🎁</span> Lenten Alms
          </h3>
          <p className="text-gray-600 text-sm">
            Consider setting aside the cost of one coffee today to donate to your local parish or a community charity.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

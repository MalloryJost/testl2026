
import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/ProgressCircle';
import { GOALS_INITIAL, LENT_2026 } from '../constants';

const Tracker: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('lent_goals_progress_2026');
    return saved ? JSON.parse(saved) : { diligence: [], stewardship: [] };
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    localStorage.setItem('lent_goals_progress_2026', JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (goalId: string) => {
    setCompletedDays(prev => {
      const current = prev[goalId] || [];
      if (current.includes(today)) {
        return { ...prev, [goalId]: current.filter(d => d !== today) };
      } else {
        return { ...prev, [goalId]: [...current, today] };
      }
    });
  };

  const calculateTotalLentProgress = () => {
    const start = new Date(LENT_2026.startDate);
    const end = new Date(LENT_2026.endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 40;
    
    const diffTime = now.getTime() - start.getTime();
    const daysPassed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(daysPassed, 40);
  };

  const currentDay = calculateTotalLentProgress();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center">
        <h2 className="text-xl font-bold text-purple-900 mb-6 serif">The Lenten Journey 2026</h2>
        <div className="flex justify-center">
          <ProgressCircle current={currentDay} total={40} label="Day of Lent" />
        </div>
        <p className="mt-6 text-sm text-gray-500 italic">
          "For you are dust, and to dust you shall return."
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-purple-900 px-2">Spiritual Disciplines</h3>
        {GOALS_INITIAL.map((goal) => {
          const isDoneToday = completedDays[goal.id]?.includes(today);
          return (
            <div 
              key={goal.id} 
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                isDoneToday 
                  ? 'bg-purple-800 border-purple-900 text-white shadow-md' 
                  : 'bg-white border-purple-100 text-gray-900 shadow-sm hover:border-purple-300'
              }`}
              onClick={() => toggleDay(goal.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow pr-4">
                  <h4 className={`font-bold mb-1 ${isDoneToday ? 'text-white' : 'text-purple-900'}`}>{goal.title}</h4>
                  <p className={`text-xs ${isDoneToday ? 'text-purple-200' : 'text-gray-500'}`}>{goal.description}</p>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isDoneToday ? 'border-white bg-white text-purple-800' : 'border-purple-200 text-transparent'
                }`}>
                  {isDoneToday && '✓'}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-grow bg-black/10 rounded-full h-1.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isDoneToday ? 'bg-white' : 'bg-purple-600'}`}
                    style={{ width: `${Math.min((completedDays[goal.id]?.length || 0) / 40 * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono opacity-60">
                  {completedDays[goal.id]?.length || 0}/40
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;


import React from 'react';

interface ProgressCircleProps {
  current: number;
  total: number;
  label: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ current, total, label }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  const strokeWidth = 8;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-40 h-40 transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-purple-100"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-purple-700 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-2xl font-bold text-purple-900">{percentage}%</span>
        <p className="text-[10px] uppercase text-purple-600 font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default ProgressCircle;

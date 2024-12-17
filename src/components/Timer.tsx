import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isWarning?: boolean;
}

export function Timer({ timeLeft, isWarning }: TimerProps) {
  return (
    <div 
      className={`
        flex items-center gap-2 font-bold
        ${isWarning ? 'text-red-500 animate-bounce scale-110' : 'text-gray-600'}
        transition-all duration-300
      `}
    >
      <Clock className={`w-5 h-5 ${isWarning ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-lg">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </span>
    </div>
  );
}
import React from 'react';
import { Wind } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100/50 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-stone-900 p-2.5 rounded-xl group-hover:bg-sage-600 transition-colors duration-300">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-2xl font-semibold text-stone-900 tracking-tight">MindfulMove</span>
        </div>
      </div>
    </header>
  );
};
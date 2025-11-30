import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isSearching }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const moodSuggestions = [
    "Restore my energy",
    "Calm my anxiety",
    "Build core strength",
    "Release back tension"
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sage-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-amber-100/60 rounded-full blur-[80px] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-widest">Mind-Body Connection</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-8 tracking-tight">
            Movement that listens to <br />
            <span className="italic text-sage-700">how you feel.</span>
          </h1>
          
          <p className="text-stone-500 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Find the perfect Yoga, Pilates, or Tai Chi class tailored to your current mental and emotional state.
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sage-200 to-stone-200 rounded-[20px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-stone-200/50 p-2 transition-transform transform group-hover:-translate-y-0.5">
              <div className="pl-4 text-stone-400">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe how you want to feel..."
                className="w-full px-4 py-4 bg-transparent text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none font-medium"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-stone-900 hover:bg-sage-700 text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {isSearching ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Curating...</span>
                  </>
                ) : (
                  <>
                    <span>Find Flow</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm text-stone-400 py-2">Try searching:</span>
            {moodSuggestions.map((mood) => (
              <button
                key={mood}
                onClick={() => {
                  setInput(mood);
                  onSearch(mood);
                }}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-stone-200 rounded-full text-sm text-stone-600 hover:bg-white hover:border-sage-300 hover:text-sage-800 hover:shadow-sm transition-all duration-300"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
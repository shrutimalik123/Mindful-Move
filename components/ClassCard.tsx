import React from 'react';
import { ClassSession, Platform, Intensity } from '../types';
import { Play, MapPin, Clock, Star, ArrowUpRight } from 'lucide-react';

interface ClassCardProps {
  session: ClassSession;
}

const IntensityBadge: React.FC<{ intensity: Intensity }> = ({ intensity }) => {
  const styles = {
    [Intensity.LOW]: 'bg-teal-50 text-teal-700 border-teal-100',
    [Intensity.MEDIUM]: 'bg-amber-50 text-amber-700 border-amber-100',
    [Intensity.HIGH]: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${styles[intensity]}`}>
      {intensity}
    </span>
  );
};

export const ClassCard: React.FC<ClassCardProps> = ({ session }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-stone-100 hover:border-sage-200 relative">
      
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={session.imageUrl} 
          alt={session.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
           <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-stone-800 flex items-center gap-1.5 shadow-sm">
             {session.platform === Platform.LOCAL ? <MapPin className="w-3.5 h-3.5 text-sage-600" /> : <Play className="w-3.5 h-3.5 fill-current text-sage-600" />}
             {session.platform}
           </div>
           
           <div className="flex items-center gap-1 bg-stone-900/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-medium">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              {session.rating}
           </div>
        </div>

        {/* Bottom Image info */}
        <div className="absolute bottom-4 left-4">
           <div className="flex items-center gap-2">
             <span className="bg-stone-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 border border-white/10">
               <Clock className="w-3.5 h-3.5" />
               {session.durationMinutes} min
             </span>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col relative">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sage-700 uppercase tracking-widest bg-sage-50 px-2 py-1 rounded-md">{session.type}</span>
            <IntensityBadge intensity={session.intensity} />
          </div>
          
          <h3 className="font-serif text-2xl font-medium text-stone-900 leading-tight mb-2 group-hover:text-sage-800 transition-colors">
            {session.title}
          </h3>
          
          <p className="text-sm text-stone-500 font-medium">with {session.instructor}</p>
        </div>

        {/* Mental Benefit Highlight */}
        <div className="relative overflow-hidden bg-stone-50 rounded-2xl p-4 mb-6 border border-stone-100 group-hover:bg-sage-50/50 transition-colors">
           <div className="flex flex-col gap-1 relative z-10">
             <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Value Add</span>
             <p className="text-sm text-stone-700 font-medium italic font-serif">
               "{session.mentalBenefit}"
             </p>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between border-t border-stone-100 pt-5">
           <div className="flex flex-wrap gap-1.5 max-w-[70%]">
             {session.tags.slice(0, 2).map(tag => (
               <span key={tag} className="text-[10px] font-medium text-stone-500 bg-white border border-stone-200 px-2 py-1 rounded-md">
                 #{tag}
               </span>
             ))}
           </div>
           
           <button className="h-10 w-10 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg group-hover:bg-sage-600 transition-all duration-300 group-hover:scale-110">
             <ArrowUpRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};
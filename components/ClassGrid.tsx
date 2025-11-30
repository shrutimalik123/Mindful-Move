import React from 'react';
import { ClassSession } from '../types';
import { ClassCard } from './ClassCard';

interface ClassGridProps {
  classes: ClassSession[];
  loading: boolean;
}

export const ClassGrid: React.FC<ClassGridProps> = ({ classes, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[24px] h-[520px] animate-pulse border border-stone-100 overflow-hidden shadow-sm">
               <div className="h-60 bg-stone-100"></div>
               <div className="p-6 space-y-6">
                 <div className="flex justify-between">
                    <div className="h-5 bg-stone-100 rounded w-1/4"></div>
                    <div className="h-5 bg-stone-100 rounded w-1/5"></div>
                 </div>
                 <div className="h-8 bg-stone-100 rounded w-3/4"></div>
                 <div className="h-4 bg-stone-100 rounded w-1/3"></div>
                 <div className="h-24 bg-stone-50 rounded-2xl"></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-16 h-1 bg-stone-200 mx-auto rounded-full mb-6"></div>
        <h3 className="text-3xl font-serif text-stone-300 mb-3">No classes found</h3>
        <p className="text-stone-500">Try adjusting your filters to find your flow.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-10 border-b border-stone-100 pb-4">
        <div>
           <h2 className="text-3xl font-serif text-stone-900">Curated For You</h2>
           <p className="text-stone-500 mt-1 font-light">Movement practices matching your intention.</p>
        </div>
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest border border-stone-200 px-3 py-1 rounded-full">{classes.length} Sessions</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((session) => (
          <ClassCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { ClassType, FilterState, Intensity } from '../types';
import { Clock, Activity, ChevronDown, Check } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  
  const toggleType = (type: ClassType) => {
    const current = filters.selectedTypes;
    if (current.includes(type)) {
      onFilterChange({ selectedTypes: current.filter(t => t !== type) });
    } else {
      onFilterChange({ selectedTypes: [...current, type] });
    }
  };

  return (
    <div className="sticky top-20 z-40 pb-4 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Class Types Chips */}
            <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2">
                {Object.values(ClassType).map((type) => {
                  const isSelected = filters.selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`
                        relative group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                        ${isSelected
                          ? 'bg-stone-900 border-stone-900 text-white shadow-lg shadow-stone-200' 
                          : 'bg-white border-stone-200 text-stone-600 hover:border-sage-400 hover:text-stone-900'}
                      `}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full lg:w-auto flex items-center gap-3 border-t lg:border-t-0 border-stone-100 pt-4 lg:pt-0">
              
              {/* Custom styled select wrappers */}
              <div className="relative group flex-1 sm:flex-none">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-hover:text-sage-600 transition-colors" />
                <select 
                  value={filters.maxDuration}
                  onChange={(e) => onFilterChange({ maxDuration: Number(e.target.value) })}
                  className="w-full sm:w-auto appearance-none bg-stone-50 hover:bg-white border border-transparent hover:border-stone-200 rounded-xl pl-9 pr-10 py-2.5 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-sage-100 cursor-pointer transition-all"
                >
                  <option value={15}>&lt; 15 mins</option>
                  <option value={30}>&lt; 30 mins</option>
                  <option value={45}>&lt; 45 mins</option>
                  <option value={60}>&lt; 60 mins</option>
                  <option value={90}>Any Duration</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>

              <div className="relative group flex-1 sm:flex-none">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-hover:text-sage-600 transition-colors" />
                <select
                  value={filters.intensity || ''}
                  onChange={(e) => onFilterChange({ intensity: e.target.value as Intensity || undefined })}
                  className="w-full sm:w-auto appearance-none bg-stone-50 hover:bg-white border border-transparent hover:border-stone-200 rounded-xl pl-9 pr-10 py-2.5 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-sage-100 cursor-pointer transition-all"
                >
                  <option value="">Any Intensity</option>
                  {Object.values(Intensity).map(int => (
                    <option key={int} value={int}>{int}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
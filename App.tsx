import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ClassGrid } from './components/ClassGrid';
import { Footer } from './components/Footer';
import { FilterState, ClassSession } from './types';
import { fetchRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedTypes: [],
    maxDuration: 90,
  });

  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadClasses = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchRecommendations(filters);
      setClasses(results);
    } catch (error) {
      console.error("Failed to load classes", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
     loadClasses();
  }, [filters, loadClasses]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-900 selection:bg-sage-200 selection:text-sage-900">
      <Header />
      <main className="flex-grow">
        <Hero 
          onSearch={handleSearch} 
          isSearching={loading}
        />
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        <ClassGrid 
          classes={classes} 
          loading={loading} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
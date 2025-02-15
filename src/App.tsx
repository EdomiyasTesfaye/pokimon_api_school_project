import React, { useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import { usePokemonData } from './hooks/usePokemonData';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { 
    pokemons, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    onPageChange 
  } = usePokemonData(searchTerm, selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <ThemeToggle />
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Pokémon Explorer</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover and learn about different Pokémon</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterSection selectedType={selectedType} onTypeChange={setSelectedType} />
        </div>

        {error && <ErrorMessage message={error} />}

        <PokemonList pokemons={pokemons} />

        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
          </div>
        )}

        {!loading && pokemons.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default App
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Pokemon } from '../types';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
const ITEMS_PER_PAGE = 20;
const TOTAL_POKEMON = 1008; // Total number of Pokemon in the API

export const usePokemonData = (searchTerm: string, selectedType: string) => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Check cache first
      const cacheKey = 'pokemon-data-all';
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

      if (cachedData && cacheTimestamp) {
        const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
        if (!isExpired) {
          const data = JSON.parse(cachedData);
          setAllPokemons(data);
          setLoading(false);
          return;
        }
      }

      // Fetch all Pokemon data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`
      );
      if (!response.ok) throw new Error('Failed to fetch Pokémon data');
      
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailResponse = await fetch(pokemon.url);
          if (!detailResponse.ok) throw new Error('Failed to fetch Pokémon details');
          return detailResponse.json();
        })
      );

      const formattedPokemons = pokemonDetails.map((detail: any) => ({
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
        types: detail.types.map((type: any) => type.type.name),
      }));

      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify(formattedPokemons));
      localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());

      setAllPokemons(formattedPokemons);
    } catch (err) {
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  // Memoize filtered pokemons
  const filteredPokemons = useMemo(() => {
    return allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || pokemon.types.includes(selectedType);
      return matchesSearch && matchesType;
    });
  }, [allPokemons, searchTerm, selectedType]);

  // Memoize pagination calculations
  const { paginatedPokemons, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
    const paginated = filteredPokemons.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedPokemons: paginated, totalPages: total };
  }, [filteredPokemons, currentPage]);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    pokemons: paginatedPokemons,
    loading,
    error,
    currentPage,
    totalPages,
    onPageChange,
    hasMore: currentPage < totalPages,
  };
};
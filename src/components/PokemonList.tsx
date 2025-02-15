import React from 'react';
import { Pokemon } from '../types';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                     transform hover:scale-105 transition-all duration-200"
        >
          <div className="relative pt-[100%] bg-gray-50 dark:bg-gray-700">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white capitalize mb-2">
              {pokemon.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: getTypeColor(type), color: 'white' }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#777777';
};

export default PokemonList;
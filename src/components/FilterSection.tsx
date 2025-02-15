import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ selectedType, onTypeChange }) => {
  const types = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon',
    'dark', 'steel', 'fairy'
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="text-gray-400 dark:text-gray-500 w-5 h-5" />
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   capitalize"
      >
        {types.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSection;
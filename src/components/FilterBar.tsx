import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export type SortOption = 'relevance' | 'title' | 'year-desc' | 'year-asc' | 'rating';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

export const FilterBar = ({ sortBy, onSortChange, totalResults }: FilterBarProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-gray-600">
        <SlidersHorizontal size={20} />
        <span className="font-medium">
          {totalResults.toLocaleString()} results found
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-700">
          <ArrowUpDown size={18} />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="title">Title (A-Z)</option>
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

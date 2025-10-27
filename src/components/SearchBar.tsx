import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchParams } from '../services/openLibraryApi';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [searchMode, setSearchMode] = useState<'simple' | 'advanced'>('simple');
  const [simpleQuery, setSimpleQuery] = useState('');
  const [advancedParams, setAdvancedParams] = useState<SearchParams>({
    title: '',
    author: '',
    subject: '',
    isbn: '',
    publisher: '',
  });

  const handleSimpleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (simpleQuery.trim()) {
      onSearch({ query: simpleQuery, limit: 20 });
    }
  };

  const handleAdvancedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: SearchParams = { limit: 20 };
    if (advancedParams.title) params.title = advancedParams.title;
    if (advancedParams.author) params.author = advancedParams.author;
    if (advancedParams.subject) params.subject = advancedParams.subject;
    if (advancedParams.isbn) params.isbn = advancedParams.isbn;
    if (advancedParams.publisher) params.publisher = advancedParams.publisher;

    if (Object.keys(params).length > 1) {
      onSearch(params);
    }
  };

  const clearAdvancedFields = () => {
    setAdvancedParams({
      title: '',
      author: '',
      subject: '',
      isbn: '',
      publisher: '',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setSearchMode('simple')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            searchMode === 'simple'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Simple Search
        </button>
        <button
          onClick={() => setSearchMode('advanced')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            searchMode === 'advanced'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter size={18} />
          Advanced Search
        </button>
      </div>

      {searchMode === 'simple' ? (
        <form onSubmit={handleSimpleSearch} className="relative">
          <input
            type="text"
            value={simpleQuery}
            onChange={(e) => setSimpleQuery(e.target.value)}
            placeholder="Search for books, authors, ISBN, or subjects..."
            className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !simpleQuery.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search size={24} />
          </button>
        </form>
      ) : (
        <form onSubmit={handleAdvancedSearch} className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>
              <input
                type="text"
                value={advancedParams.title}
                onChange={(e) => setAdvancedParams({ ...advancedParams, title: e.target.value })}
                placeholder="e.g., The Great Gatsby"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={advancedParams.author}
                onChange={(e) => setAdvancedParams({ ...advancedParams, author: e.target.value })}
                placeholder="e.g., F. Scott Fitzgerald"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject/Genre
              </label>
              <input
                type="text"
                value={advancedParams.subject}
                onChange={(e) => setAdvancedParams({ ...advancedParams, subject: e.target.value })}
                placeholder="e.g., Fiction, Science"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN
              </label>
              <input
                type="text"
                value={advancedParams.isbn}
                onChange={(e) => setAdvancedParams({ ...advancedParams, isbn: e.target.value })}
                placeholder="e.g., 9780743273565"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                value={advancedParams.publisher}
                onChange={(e) => setAdvancedParams({ ...advancedParams, publisher: e.target.value })}
                placeholder="e.g., Penguin Books"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Search Books
            </button>
            <button
              type="button"
              onClick={clearAdvancedFields}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
            >
              <X size={20} />
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

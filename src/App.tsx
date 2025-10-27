import { useState } from 'react';
import { Book } from './types/book';
import { searchBooks, SearchParams } from './services/openLibraryApi';
import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { FilterBar, SortOption } from './components/FilterBar';
import { BookOpen, Loader2, BookMarked } from 'lucide-react';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchBooks(params);
      setBooks(response.docs);
      setFilteredBooks(response.docs);
      setTotalResults(response.numFound);
      setSortBy('relevance');
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sortBooks = (booksToSort: Book[], sortOption: SortOption): Book[] => {
    const sorted = [...booksToSort];

    switch (sortOption) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'year-desc':
        return sorted.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
      case 'year-asc':
        return sorted.sort((a, b) => (a.first_publish_year || 9999) - (b.first_publish_year || 9999));
      case 'rating':
        return sorted.sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0));
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    const sorted = sortBooks(filteredBooks, newSort);
    setFilteredBooks(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
              <BookOpen size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BookFinder
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover millions of books from the Open Library. Search by title, author, ISBN, subject, and more.
          </p>
        </header>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Searching for books...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && hasSearched && books.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
            <BookMarked size={48} className="text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search terms or using different keywords.</p>
          </div>
        )}

        {!isLoading && !error && books.length > 0 && (
          <>
            <div className="mb-6">
              <FilterBar
                sortBy={sortBy}
                onSortChange={handleSortChange}
                totalResults={totalResults}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
              <BookOpen size={64} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Book Discovery Journey
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Use the search bar above to find your next great read. Try searching by title, author, or explore by subject.
            </p>
          </div>
        )}

        {selectedBook && (
          <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>
    </div>
  );
}

export default App;

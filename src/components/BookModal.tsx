import { Book } from '../types/book';
import { getCoverUrl } from '../services/openLibraryApi';
import { X, Calendar, BookOpen, Globe, Hash, Building2, Tag, Star, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export const BookModal = ({ book, onClose }: BookModalProps) => {
  const coverUrl = getCoverUrl(book.cover_i, 'L');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 pr-8 line-clamp-1">{book.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <div>
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg mb-4">
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"%3E%3Crect fill="%23e5e7eb" width="300" height="450"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3ENo Cover%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              {book.ratings_average && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={20} className="text-yellow-600" fill="currentColor" />
                    <span className="text-2xl font-bold text-gray-900">{book.ratings_average.toFixed(2)}</span>
                  </div>
                  {book.ratings_count && (
                    <p className="text-sm text-gray-600">{book.ratings_count.toLocaleString()} ratings</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {book.author_name && book.author_name.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Author{book.author_name.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-lg text-gray-900">
                    {book.author_name.join(', ')}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {book.first_publish_year && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">First Published</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{book.first_publish_year}</p>
                  </div>
                )}

                {book.edition_count && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <BookOpen size={18} />
                      <span className="text-sm font-medium">Editions</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{book.edition_count}</p>
                  </div>
                )}
              </div>

              {book.isbn && book.isbn.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Hash size={18} />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">ISBN</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.isbn.slice(0, 3).map((isbn, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-mono"
                      >
                        {isbn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {book.publisher && book.publisher.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Building2 size={18} />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Publisher{book.publisher.length > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {book.publisher.slice(0, 5).join(', ')}
                    {book.publisher.length > 5 && ` +${book.publisher.length - 5} more`}
                  </p>
                </div>
              )}

              {book.language && book.language.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Globe size={18} />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.language.slice(0, 8).map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium uppercase"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <Tag size={18} />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">Subjects & Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 15).map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-sm border border-purple-200 hover:border-purple-300 transition-colors"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 15 && (
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        +{book.subject.length - 15} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <TrendingUp size={20} />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

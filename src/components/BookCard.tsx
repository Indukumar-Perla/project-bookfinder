import { Book } from '../types/book';
import { getCoverUrl } from '../services/openLibraryApi';
import { BookOpen, Calendar, Star, Globe } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const coverUrl = getCoverUrl(book.cover_i, 'M');
  const authors = book.author_name?.slice(0, 2).join(', ') || 'Unknown Author';
  const hasMoreAuthors = book.author_name && book.author_name.length > 2;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200"
    >
      <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect fill="%23e5e7eb" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="18" fill="%239ca3af"%3ENo Cover%3C/text%3E%3C/svg%3E';
          }}
        />
        {book.ratings_average && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold shadow-lg">
            <Star size={14} fill="currentColor" />
            {book.ratings_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {authors}
          {hasMoreAuthors && <span className="text-gray-400"> +{book.author_name!.length - 2} more</span>}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {book.first_publish_year && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {book.first_publish_year}
            </div>
          )}
          {book.edition_count && (
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              {book.edition_count} editions
            </div>
          )}
          {book.language && book.language.length > 0 && (
            <div className="flex items-center gap-1">
              <Globe size={14} />
              {book.language.length} lang{book.language.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

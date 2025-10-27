import { Book, OpenLibraryResponse } from '../types/book';

const BASE_URL = 'https://openlibrary.org';

export interface SearchParams {
  query?: string;
  title?: string;
  author?: string;
  subject?: string;
  isbn?: string;
  publisher?: string;
  limit?: number;
  offset?: number;
}

export const searchBooks = async (params: SearchParams): Promise<OpenLibraryResponse> => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append('q', params.query);
  if (params.title) searchParams.append('title', params.title);
  if (params.author) searchParams.append('author', params.author);
  if (params.subject) searchParams.append('subject', params.subject);
  if (params.isbn) searchParams.append('isbn', params.isbn);
  if (params.publisher) searchParams.append('publisher', params.publisher);
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.offset) searchParams.append('offset', params.offset.toString());

  const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return response.json();
};

export const getCoverUrl = (coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string => {
  if (!coverId) return '/placeholder-book.png';
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getBookByKey = async (key: string): Promise<Book> => {
  const response = await fetch(`${BASE_URL}${key}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch book details');
  }

  return response.json();
};

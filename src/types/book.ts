export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
  language?: string[];
  subject?: string[];
  edition_count?: number;
  ratings_average?: number;
  ratings_count?: number;
}

export interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

export interface SavedBook extends Book {
  id: string;
  listId: string;
  isFavorite: boolean;
  notes: string;
  addedAt: string;
}

export interface ReadingList {
  id: string;
  name: string;
  description: string;
  books: SavedBook[];
}

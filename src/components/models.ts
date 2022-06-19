export interface Item {
  id: string;
  title: string;
  type: ItemType;
  tagline?: string;
  year: string;
  image: string;
  runtimeStr: string;
  plot: string;
  directors: string;
  stars: string;
  genres: string;
  genreList: ItemGenre[];
  imDbRating: string;
  keywords: string;
  tvSeriesInfo?: TVSeriesInfo;
}

export enum ItemType {
  UNSPECIFIED = '',
  MOVIE = 'Movie',
  SERIES = 'TVSeries',
}

export interface ItemGenre {
  key: string;
  value: string;
}

export interface TVSeriesInfo {
  seasons: string[];
}

export interface ItemService {
  getAllItems: () => Item[];
  getItemsByGenre: (genre: string) => Item[];
  getItemsBySearchphrase: (searchphrase: string) => Item[];
  getItemsByType: (type: ItemType) => Item[];
  getAllGenres: () => string[];
}

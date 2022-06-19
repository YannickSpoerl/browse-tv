import { Item, ItemGenre, ItemType, ItemService } from 'src/components/models';

export class StaticJsonItemService implements ItemService {
  private items;

  public constructor() {
    const items = require('src/assets/database.json') as Record<string, Item>;
    this.items = Object.values(items).sort(this.sortItems);
  }

  private sortItems(item1: Item, item2: Item): number {
    return ('' + item1.title).localeCompare(item2.title);
  }

  private genreFilter(item: Item, filteredGenre: string): boolean {
    const itemGenres = item.genreList.map((genre: ItemGenre) => {
      return genre.key;
    });
    return itemGenres.includes(filteredGenre);
  }

  private typeFilter(item: Item, type: ItemType): boolean {
    return item.type == type;
  }

  private searchphraseFilter(item: Item, searchPhrase: string): boolean {
    const searchPhraseLower = searchPhrase.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchPhraseLower) ||
      item.directors.toLowerCase().includes(searchPhraseLower) ||
      item.genres.toLowerCase().includes(searchPhraseLower) ||
      item.keywords.toLowerCase().includes(searchPhraseLower) ||
      item.stars.toLowerCase().includes(searchPhraseLower)
    );
  }

  public getAllItems(): Item[] {
    return this.items;
  }

  public getItemsByGenre(genre: string): Item[] {
    const itemsByGenre = this.getAllItems().filter((item: Item) => {
      return this.genreFilter(item, genre);
    });
    return itemsByGenre.sort(this.sortItems);
  }

  public getItemsByType(type: ItemType): Item[] {
    const itemsByType = this.getAllItems().filter((item: Item) => {
      return this.typeFilter(item, type);
    });
    return itemsByType.sort(this.sortItems);
  }

  public getItemsBySearchphrase(searchphrase: string): Item[] {
    const itemsBySearchphrase = this.getAllItems().filter((item: Item) => {
      return this.searchphraseFilter(item, searchphrase);
    });
    return itemsBySearchphrase.sort(this.sortItems);
  }

  public getItemsByGenreTypeAndSearchphrase(
    genre: string,
    type: ItemType,
    searchPhrase: string
  ): Item[] {
    let items = this.getAllItems();
    if (genre) {
      items = items.filter((item: Item) => {
        return this.genreFilter(item, genre);
      });
    }
    if (type) {
      items = items.filter((item: Item) => {
        return this.typeFilter(item, type);
      });
    }
    if (searchPhrase) {
      items = items.filter((item: Item) => {
        return this.searchphraseFilter(item, searchPhrase);
      });
    }
    return items.sort(this.sortItems);
  }

  public getAllGenres(): string[] {
    const allGenres = this.getAllItems().map((item: Item) => {
      return item.genreList;
    });
    return [
      ...new Set(
        allGenres
          .reduce((accumulator, value) => accumulator.concat(value), [])
          .map((genre: ItemGenre) => {
            return genre.key;
          })
      ),
    ].sort() as string[];
  }
}

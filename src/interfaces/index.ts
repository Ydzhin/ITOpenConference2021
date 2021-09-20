export interface Characters {
  info: {
    count: number;
    pages: number;
  };
  results: {
    image: string;
    name: string;
    id: string;
    gender: string;
    species: string;
    episode: Array<string>;
  };
}

export interface State {
  characters: Characters;
  page: number;
  searchValue: string;
  favouriteCharacters: Array<Character>;
}

export interface Character {
  image: string;
  name: string;
  id: string;
  gender: string;
  species: string;
  episode: Array<string>;
}

export interface RefNumber {
  value: number;
}

export interface RefString {
  value: string;
}

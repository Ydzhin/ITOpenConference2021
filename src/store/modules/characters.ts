import CharactersService from "@/api/CharactersService";
import { Characters, State, Character } from "@/interfaces";
import { toRefs } from "vue";
import { Commit } from "vuex";

const state = () => ({
  characters: [],
  page: 1,
  searchValue: "",
  favouriteCharacters: [],
});

const getters = {
  characters: (state: State): Characters => state.characters,
  page: (state: State): number => state.page,
  favouritesCharacters: (state: State): Array<Character> =>
    state.favouriteCharacters,
};

const actions = {
  setCharacters: async ({
    commit,
    state,
  }: {
    commit: Commit;
    state: State;
  }): Promise<void> => {
    const { page, searchValue } = toRefs(state);
    const characters = await CharactersService.getCharacters(page, searchValue);
    commit("setCharacters", characters);
  },
  setPage: ({ commit }: { commit: Commit }, page: number): void => {
    commit("setPage", page);
  },
  setSearchValue: (
    { commit }: { commit: Commit },
    searchValue: string
  ): void => {
    commit("setSearchValue", searchValue);
  },
  addToFavourites: (
    { commit }: { commit: Commit },
    character: Character
  ): void => {
    const character_stringified = JSON.stringify(character);
    localStorage.setItem(character.id, character_stringified);
    commit("addToFavourites", character);
  },
  removeFromFavourites: ({ commit }: { commit: Commit }, id: number): void => {
    localStorage.removeItem(id + "");
    commit("removeFromFavourites", id);
  },
  initFavourites: (
    { commit }: { commit: Commit },
    characters: Characters
  ): void => {
    commit("initFavourites", characters);
  },
};

const mutations = {
  setCharacters: (state: State, characters: Characters): void => {
    state.characters = characters;
  },
  setPage: (state: State, page: number): void => {
    state.page = page;
  },
  setSearchValue: (state: State, searchValue: string): void => {
    state.searchValue = searchValue;
  },
  addToFavourites: (state: State, character: Character): void => {
    state.favouriteCharacters = [...state.favouriteCharacters, character];
  },
  removeFromFavourites: (state: State, id: number): void => {
    state.favouriteCharacters = state.favouriteCharacters.filter(
      (char: Character) => +char.id !== id
    );
  },
  initFavourites: (state: State, characters: any): void => {
    Object.keys(characters).forEach((key) => {
      if (isNaN(+key)) return;
      state.favouriteCharacters = [
        ...state.favouriteCharacters,
        JSON.parse(characters.getItem(key)),
      ];
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

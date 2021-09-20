<template>
  <div class="component">
    <Table
      :characters="characters?.characters?.results"
      @addToFavourites="addToFavourites"
      @removeFromFavourites="removeFromFavourites"
      :isFavouritePage="false"
      :favouritesCharacters="favouritesCharacters"
    />
    <Pagination
      @setPage="setPage"
      :isFavouritePage="false"
      :pages="characters?.characters?.info.pages"
    />
    <!-- <div>{{ characters?.characters?.info.pages  }}</div> -->
  </div>
</template>

<script>
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { computed } from "vue";
import { inject } from "vue";

export default {
  name: "All",
  components: {
    Table,
    Pagination,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = inject("store");
    const characters = computed(() => store.getters["characters/characters"]);
    const favouritesCharacters = computed(
      () => store.getters["characters/favouritesCharacters"]
    );

    const addToFavourites = (param) => {
      store.dispatch("characters/addToFavourites", param);
    };

    const removeFromFavourites = (id) => {
      store.dispatch("characters/removeFromFavourites", id);
    };

    const setPage = (page) => {
      store.dispatch("characters/setPage", page);
    };

    return {
      characters,
      favouritesCharacters,
      addToFavourites,
      setPage,
      removeFromFavourites,
    };
  },
};
</script>
<style lang="scss"></style>

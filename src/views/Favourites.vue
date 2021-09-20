<template>
  <div class="component">
    <Table
      :characters="characters.slice((currentPage - 1) * 20, currentPage * 20)"
      @removeFromFavourites="removeFromFavourites"
      :isFavouritePage="true"
    />
    <Pagination
      @setPage="setPage"
      :isFavouritePage="true"
      :pages="Math.ceil(characters.length / 20)"
    />
  </div>
</template>

<script>
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { computed, ref } from "vue";
import { inject } from "vue";

export default {
  name: "Favourites",
  components: {
    Table,
    Pagination,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = inject("store");
    const characters = computed(
      () => store.getters["characters/favouritesCharacters"]
    );
    const currentPage = ref(1);

    const removeFromFavourites = (id) =>
      store.dispatch("characters/removeFromFavourites", id);
    const setPage = (page) => (currentPage.value = page);

    return {
      setPage,
      characters,
      currentPage,
      removeFromFavourites,
    };
  },
};
</script>

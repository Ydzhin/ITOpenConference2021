<template>
  <div class="input">
    <input
      v-model="name"
      @keyup.enter="search"
      type="search"
      name="search"
      placeholder="Start typing to search..."
      id="character-search"
    />
    <img class="magnifyier" @click="search" :src="magnifyier" alt="my-logo" />
  </div>
</template>
<script>
import { ref } from "vue";
import { inject } from "vue";

import magnifyier from "@/assets/icons/magnifyier.svg";

export default {
  name: "Search",
  setup() {
    const name = ref(null);
    const store = inject("store");
    const search = () =>
      store.dispatch("characters/setSearchValue", name.value);

    return {
      name,
      magnifyier,
      search,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.input {
  margin-left: 8rem;
  max-width: 505px;
  width: 50%;
  position: relative;

  @media (max-width: $sizeBreakpointTablet) {
    display: none;
    max-width: unset;
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }

  &.active {
    display: block;
  }

  input {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 500;
    padding: 16px 20px;
    border: 1px solid $grey;
    border-radius: 12px;
    color: $grey;
    width: 100%;
    max-height: 56px;

    &:focus {
      outline: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }

  .magnifyier {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
}
</style>

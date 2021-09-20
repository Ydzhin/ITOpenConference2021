<template>
  <nav class="component">
    <router-link to="/">
      <img class="logo" :src="logo" alt="Rick Morthy logo" />
    </router-link>
    <button class="show-search" @click="showSearch = !showSearch">
      <img
        v-show="!showSearch"
        class="magnifyier"
        @click="isSearchVisible = !isSearchVisible"
        :src="magnifyier"
        alt="my-logo"
      />
      <span v-show="showSearch" class="show-search__arrow"></span>
    </button>
    <Search :class="{ active: showSearch }" />
  </nav>
</template>

<script>
import { ref } from "vue";
import Search from "./Search";
import magnifyier from "@/assets/icons/magnifyier.svg";
import logo from "@/assets/icons/logo.svg";

export default {
  name: "Header",
  components: {
    Search,
  },
  setup() {
    const showSearch = ref(false);

    return {
      showSearch,
      magnifyier,
      logo,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 3.2rem 0 4rem 0;

  @media (min-width: $sizeBreakpointTablet) {
    flex-wrap: nowrap;
  }

  .show-search {
    position: relative;
    display: block;
    width: 4.3rem;
    height: 4.3rem;
    border: 2px solid $cyan;
    border-radius: 8px;
    margin-left: auto;

    @media (min-width: $sizeBreakpointTablet) {
      display: none;
    }

    &__arrow {
      position: absolute;
      left: 30%;
      top: 40%;
      width: 16px;
      height: 16px;
      border-top: 4px solid $cyan;
      border-right: 4px solid $cyan;
      transform: rotate(-45deg);
    }
  }

  .logo {
    display: block;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50vw);
    width: 100vw;
    height: 1px;
    background-color: $greyMedium;
  }
}
</style>

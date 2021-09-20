<template lang="">
  <div class="component tabs">
    <router-link to="/">All</router-link>
    <router-link to="/favourites">Favourites</router-link>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.tabs {
  padding: 24px 0 30px 0;
  a {
    position: relative;
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    margin-right: 8rem;
    color: $grey;

    &::after {
      display: none;
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $cyan;
    }
  }

  a.router-link-active {
    color: $cyan;

    &::after {
      display: block;
    }
  }

  @media (max-width: $sizeBreakpointTablet) {
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50vw);
      width: 100vw;
      height: 2px;
      background-color: $greyMedium;
    }
  }
}
</style>

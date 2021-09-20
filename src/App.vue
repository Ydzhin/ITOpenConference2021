<template>
  <Header />
  <Tabs />

  <router-view v-slot="{ Component }">
    <keep-alive>
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </keep-alive>
  </router-view>
</template>

<script>
import { useStore } from "vuex";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { provide } from "vue";

export default {
  name: "App",
  components: {
    Header,
    Tabs,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = useStore();
    const page = 1;
    store.dispatch("characters/setCharacters", page);
    store.dispatch("characters/initFavourites", localStorage);
    provide("store", store);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>

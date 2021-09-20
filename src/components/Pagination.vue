<template lang="">
  <div class="pagination" ref="pagination" v-if="pages">
    <span :class="{ disabled: current === 1 }" @click="prevClick">
      <img :src="arrow" alt="arrow previous icon" />
    </span>
    <span
      :data-page="page"
      @click="pageClick"
      v-for="page in pages"
      :key="page"
      :class="{ active: isActive(page), visible: isVisible(page) }"
    >
      {{ page }}
    </span>
    <span v-show="current < pages - 4">...</span>
    <span
      @click="pageClick"
      v-show="current < pages - 4"
      :data-page="pages"
      :class="{ active: isActive(pages) }"
    >
      {{ pages }}
    </span>
    <span :class="{ disabled: current === pages }" @click="nextClick">
      <img :src="arrow" alt="arrow next icon" />
    </span>
  </div>
</template>
<script>
import arrow from "@/assets/icons/arrow.svg";
import { ref, inject } from "vue";

export default {
  name: "Pagination",
  emits: ["setPage"],
  props: {
    pages: {
      type: Number,
    },
    isFavouritePage: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, { emit }) {
    const store = inject("store");
    const current = ref(1);
    const pagination = ref(null);

    const isActive = (page) => current.value === page;
    const isVisible = (page) =>
      current.value === page + 1 ||
      (current.value > props.pages - 5 && page > props.pages - 6);

    const prevClick = () => {
      current.value = current.value === 0 ? current.value : current.value - 1;
      changePage();
    };

    const nextClick = () => {
      current.value++;
      changePage();
    };

    const pageClick = (e) => {
      current.value = +e.target.dataset.page;
      changePage();
    };

    const changePage = () => {
      emit("setPage", current.value);
    };

    return {
      prevClick,
      nextClick,
      isActive,
      isVisible,
      pageClick,
      changePage,
      pagination,
      props,
      store,
      current,
      arrow,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.pagination {
  display: flex;
  flex-wrap: nowrap;
  margin: 4rem 0;

  span {
    font-family: "Poppins", sans-serif;
    font-size: 16;
    font-weight: 500;
    font-size: 2rem;
    margin: 0 1rem;
    color: $white;
    border-radius: 4px;
    cursor: pointer;
    display: none;
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background-color: transparent;
    border: 1px solid $grey;
    color: $grey;
    user-select: none;

    &:first-of-type,
    &:last-of-type,
    &:nth-last-of-type(2),
    &:nth-last-of-type(3),
    &:nth-of-type(2).active + span + span + span,
    &:nth-last-of-type(8).active + span + span + span {
      display: inline-block;
    }

    &:first-of-type {
      transform: rotate(-180deg);
      margin-left: 0;
    }

    &:nth-last-of-type(3) {
      cursor: default;
    }

    &.disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }

    &.visible {
      display: inline-block;
    }

    &.active {
      display: inline-block;
      background-color: $cyan;
      border-color: $cyan;
      color: $white;

      & + span,
      & + span + span {
        display: inline-block;
        background-color: transparent;
      }
    }
  }

  @media (max-width: $sizeBreakpointTablet) {
    span {
      font-size: 1.8rem;
      margin: 0 0.8rem;
      width: 3.6rem;
      height: 3.6rem;
      line-height: 3.6rem;

      &:first-of-type,
      &:last-of-type {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media (max-width: $sizeBreakpointMobile) {
    span {
      font-size: 1.5rem;
      margin: 0 0.4rem;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
}
</style>

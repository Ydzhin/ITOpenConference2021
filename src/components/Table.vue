<template lang="">
  <table class="table">
    <tr class="table__labels">
      <th class="table__labels__item">Photo</th>
      <th class="table__labels__item"><span>Character</span> ID</th>
      <th class="table__labels__item">Name</th>
      <th class="table__labels__item">Gender</th>
      <th class="table__labels__item">Species</th>
      <th class="table__labels__item">Last Episode</th>
      
      
      
      <th class="table__labels__item">
        <span>{{ isFavouritePage ? "Remove from" : "Add to" }}</span>
        Favourite<span>s</span>
      </th>
    </tr>
    <tr
      class="table__cells"
      v-for="character in props?.characters"
      :key="character.id"
    >
      <td class="table__cells__item">
        <img
          class="table__cells__item__img"
          :src="character.image"
          alt="character image"
        />
                                                              
      </td>
      <td class="table__cells__item" data-th="Character ID">
        {{ character.id }}
      </td>
      <td class="table__cells__item" data-th="Name">{{ character.name }}</td>
      <td class="table__cells__item" data-th="Gender">
        <img :src="getGenderIcon(character.gender)" alt="gender icon" />{{
          character.gender
        }}
      </td>
      <td class="table__cells__item" data-th="Species">
        {{ character.species }}
      </td>
      <td class="table__cells__item" data-th="Last Episode">
        {{ character.episode[character.episode.length - 1].episode }}
      </td>
      <td class="table__cells__item" data-th="Add to Favourites">
        <button
          :class="{
            remove: isFavouritePage || favCharIDs.includes(character.id),
          }"
          @click="clickFavourite(character)"
        >
          <img
            class="star"
            :src="star"
            alt="add to
  favourite icon"
          />
        </button>
      </td>
    </tr>
  </table>
  <span
    v-show="(!characters || characters?.length === 0) && zeroResults"
    class="table__msg"
    >No characters found</span
  >
  <span
    v-if="(!characters || characters?.length === 0) && !zeroResults"
    class="table__spinner"
  ></span>
</template>
<script>
import { computed, ref } from "vue";
import star from "@/assets/icons/star.svg";

import male from "@/assets/icons/male.svg";
import female from "@/assets/icons/female.svg";
import genderless from "@/assets/icons/genderless.svg";
import unknown from "@/assets/icons/unknown.svg";

export default {
  name: "Table",
  emits: ["removeFromFavourites", "addToFavourites"],
  props: {
    characters: {
      required: true,
    },
    isFavouritePage: {
      type: Boolean,
      default: false,
      required: false,
    },
    favouritesCharacters: {
      type: Object,
      required: false,
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { emit }) {
    const zeroResults = ref(false);

    const clickFavourite = (character) => {
      const ev =
        props.isFavouritePage || favCharIDs.value.includes(character.id)
          ? "removeFromFavourites"
          : "addToFavourites";
      const data =
        props.isFavouritePage || favCharIDs.value.includes(character.id)
          ? +character.id
          : character;
      emit(ev, data);
    };

    setTimeout(() => {
      zeroResults.value = true;
    }, 6000);

    const favCharIDs = computed(() =>
      props.favouritesCharacters.map((char) => char.id)
    );

    const getGenderIcon = (gender) => {
      const icon =
        gender === "Male"
          ? male
          : gender === "Female"
          ? female
          : gender === "Genderless"
          ? genderless
          : unknown;
      return icon;
    };

    return {
      props,
      star,
      clickFavourite,
      favCharIDs,
      zeroResults,
      getGenderIcon,
      male,
      female,
      genderless,
      unknown,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.table {
  min-width: 300px;
  color: $grey;
  border-radius: 0.4em;
  font-size: 1.6rem;
  width: 100%;
  border-collapse: collapse;

  &__msg {
    margin-top: 4rem;
    display: block;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    color: $grey;
  }

  &__spinner {
    position: absolute;
    left: 50%;
    top: 10rem;
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 3px solid $greyLight;
    border-radius: 50%;
    border-top-color: $cyan;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;

    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
  }

  th,
  td {
    font-size: 16px;
    text-align: left;
    padding-right: 2rem;

    @media (min-width: $sizeBreakpointTablet) {
      display: table-cell;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }

  @media (max-width: $sizeBreakpointTablet) {
    td:first-of-type {
      padding: 0;
    }
  }

  &__labels {
    position: relative;
    transform: scale(1);
    background-color: $greyLight;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50vw);
      width: 100vw;
      height: 100%;
      background-color: $greyLight;
      z-index: -1;
    }

    &__item {
      display: none;
      font-family: "Poppins";
      font-weight: 500;
      white-space: nowrap;
      padding: 16px 0;

      @media (max-width: $sizeBreakpointDesktop) {
        span {
          display: none;
        }
      }
    }
  }

  &__cells {
    border-bottom: 1px solid #e5eaf4;

    &__item {
      position: relative;
      display: block;
      font-family: "Poppins";
      font-weight: 400;
      line-height: 22px;
      padding: 8px 0;

      @media (max-width: $sizeBreakpointTablet) {
        &:nth-of-type(2) {
          margin-top: 2rem;
        }

        &:last-of-type {
          display: inline-flex;
          align-items: center;
          margin-bottom: 2rem;
        }
      }

      &:before {
        content: attr(data-th) " ";
        width: 10em;
        display: inline-block;

        @media (min-width: $sizeBreakpointTablet) {
          display: none;
        }
      }

      &__img {
        display: block;
        width: 43px;
        height: 68px;
        object-fit: cover;

        @media (max-width: $sizeBreakpointTablet) {
          width: 100%;
          height: auto;
        }
      }

      button {
        width: 43px;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $cyan;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.22s;

        &.remove {
          background-color: $cyan;

          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }

    &__item[data-th="Gender"] {
      padding-left: 2.6rem;

      @media (max-width: $sizeBreakpointTablet) {
        padding-left: 0rem;
      }

      img {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        @media (max-width: $sizeBreakpointTablet) {
          display: none;
        }
      }
    }
  }
}
</style>

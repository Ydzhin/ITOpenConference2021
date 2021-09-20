import { useClient } from "villus";
import { useQuery } from "villus";
import { computed } from "vue";
import { RefNumber, RefString } from "@/interfaces";

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getCharacters(page: RefNumber, searchValue: RefString = { value: "" }) {
    useClient({ url: "https://rickandmortyapi.com/graphql" });

    const characters = computed(() => {
      return `query {
                        characters(page: ${page.value}, filter: {name: "${searchValue.value}"}) {
                            info {
                                count
                                pages
                            }
                            results {
                                image
                                name
                                id
                                gender
                                species
                                episode{
                                    episode
                                }
                            }                  
                        }
                    }
                    `;
    });

    const { data } = await useQuery({ query: characters });

    return data;
  },
};

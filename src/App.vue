<template>
  <div class="bg-black text-gray-300 p-4">
    <h1 class="text-3xl font-bold mb-4">Le jeu vidéal</h1>

    <div class="flex flex-col md:flex-row md:items-start">
      <div class="md:w-1/2 mb-4 md:mb-0">
        <SearchBar @search="handleSearch" />
      </div>

      <div class="md:w-1/2 md:ml-auto">
        <GenreFilter @genre-change="handleGenreChange" :on-page-change="handlePageChange" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="game in filteredResults" :key="game.id" @click="openModal(game)" class="cursor-pointer bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-800">
        <div class="mb-2">
          <img :src="game.background_image" alt="Game Image" class="max-w-full h-auto">
        </div>
        <div class="text-sm font-semibold">{{ game.name }}</div>
        <div class="text-xs">Rating: {{ game.rating }}</div>
        <div class="text-xs">Released: {{ game.released }}</div>
        <div class="text-xs">Platforms: {{ getPlatformNames(game.platforms) }}</div>
      </div>
    </div>

    <div class="mt-4">
      <button @click="loadMore" class="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-700">Load More</button>
    </div>

    <GameModal v-if="selectedGame" :game="selectedGame" @close="closeModal" />
  </div>
</template>

<!-- ... rest of the code remains unchanged ... -->





<script>
import axios from 'axios';
import GameModal from './GameModal.vue';
import GenreFilter from './GenreFilter.vue';
import PlatformFilter from './PlatformFilter.vue';
import SearchBar from './SearchBar.vue';

export default {
  data() {
    return {
      results: [],
      selectedGame: null,
      page: 1, // Track the current page
      pageSize: 9, // Number of games per page
      searchQuery: '', // Search query
      selectedGenre: null, // Track the selected genre
      selectedPlatform: null, // Track the selected platform
    };
  },
  computed: {
    filteredResults() {
      // Filter results based on search query, selected genre, and selected platform
      return this.results
        .filter(game =>
          game.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .filter(game =>
          this.selectedGenre
            ? game.genres.find(genre => genre.slug === this.selectedGenre)
            : true
        )
        .filter(game =>
          this.selectedPlatform
            ? game.platforms.find(platform => platform.slug === this.selectedPlatform)
            : true
        );
    },
  },
  mounted() {
    this.fetchDataFromServer();
  },
  methods: {
    fetchDataFromServer() {
      const apiKey = 'ec75537b01d84fb58d6e20cb0dbbb138';
      const offset = (this.page - 1) * this.pageSize;


      let apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=${this.pageSize}&offset=${offset}`;
      if (this.searchQuery) {
        apiUrl += `&search=${this.searchQuery}`;
      } else if (this.selectedGenre) {
        apiUrl += `&genres=${this.selectedGenre}`;
      } else if (this.selectedPlatform) {
        apiUrl += `&platforms=${this.selectedPlatform}`;
      }

      // Make API request
      axios.get(apiUrl)
      .then(response => {
  console.log('API Response:', response.data.results);
  console.log('Platform Data:', response.data.platforms); // Log platform data
  this.results = [...this.results, ...response.data.results];
})

        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getPlatformNames(platforms) {
      return platforms.map(platform => platform.platform.name).join(', ');
    },
    openModal(game) {
      this.selectedGame = game;
    },
    closeModal() {
      this.selectedGame = null;
    },
    loadMore() {
      // Increment page to load more results
      this.page++;
      this.fetchDataFromServer();
    },
    handleSearch(searchQuery) {
      // Handle search query change
      this.searchQuery = searchQuery;
      this.page = 1;
      this.results = [];
      this.fetchDataFromServer();
    },
    handleGenreChange(selectedGenre) {
      // Handle genre filter change
      this.selectedGenre = selectedGenre;
      this.page = 1;
      this.results = [];
      this.fetchDataFromServer();
    },
handlePlatformChange(selectedPlatform) {
  console.log('Selected Platform:', selectedPlatform);
  this.selectedPlatform = selectedPlatform;
  this.page = 1;
  this.results = [];
  this.fetchDataFromServer();
},

  },
  components: {
    GameModal,
    GenreFilter,
    PlatformFilter,
    SearchBar,
  },
};
</script>

<style scoped>
/* Your component styles go here */
/* Add any additional styles as needed */
</style>

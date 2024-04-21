<template>
  <div v-if="game">
    <h2>{{ game.name }} Details</h2>
    <img :src="game.background_image" alt="Game Image" style="max-width: 200px; max-height: 200px;">
    <p>Released: {{ game.released }}</p>
    <!-- Display other game details as needed -->
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      game: null,
    };
  },
  watch: {
    '$route.params.gameId': 'fetchGameDetails',
  },
  mounted() {
    this.fetchGameDetails();
  },
  methods: {
    async fetchGameDetails() {
      const cachedGameData = localStorage.getItem(`game-${this.$route.params.gameId}`);
      
      if (cachedGameData) {
        this.game = JSON.parse(cachedGameData);
      } else {

        try {
          const response = await axios.get(`https://api.rawg.io/api/games/${this.$route.params.gameId}?key=ec75537b01d84fb58d6e20cb0dbbb138`);
          this.game = response.data;
          
  
          localStorage.setItem(`game-${this.$route.params.gameId}`, JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching game details:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Your component styles go here */
</style>

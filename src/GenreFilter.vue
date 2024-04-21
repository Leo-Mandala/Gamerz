

<template>
    <div>
      <div class="mb-4">
        <label class="mr-2">Filtre par Genre:</label>
        <select v-model="selectedGenre" @change="handleGenreChange">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.slug">{{ genre.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      onGenreChange: Function,
    },
    data() {
      return {
        selectedGenre: '',
        genres: [],
      };
    },
    mounted() {
      // Fetch genres on component mount
      this.fetchGenres();
    },
    methods: {
      async fetchGenres() {
        const apiKey = 'ec75537b01d84fb58d6e20cb0dbbb138';
  
        try {
          const response = await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`);
          this.genres = response.data.results;
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      },
      handleGenreChange() {
        this.onGenreChange(this.selectedGenre);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles go here */
  </style>
  
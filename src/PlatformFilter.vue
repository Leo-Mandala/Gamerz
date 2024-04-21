<template>
    <div>
    
      <div class="mb-4">
        <label class="mr-2">Filtre par Platforms:</label>
        <select v-model="selectedPlatform" @change="handlePlatformChange">
          <option value="">All Platforms</option>
          <option v-for="platform in platforms" :key="platform.id" :value="platform.slug">{{ platform.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      onPlatformChange: Function,
    },
    data() {
      return {
        selectedPlatform: '',
        platforms: [],
      };
    },
    mounted() {
      // Fetch platforms on component mount
      this.fetchPlatforms();
    },
    methods: {
      async fetchPlatforms() {
        const apiKey = 'ec75537b01d84fb58d6e20cb0dbbb138';
  
        try {
          const response = await axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`);
          this.platforms = response.data.results;
        } catch (error) {
          console.error('Error fetching platforms:', error);
        }
      },
      handlePlatformChange() {
        this.onPlatformChange(this.selectedPlatform);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles go here */
  </style>
  
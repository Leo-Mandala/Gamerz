<template>
    <div>

      <input v-model="searchQuery" @input="handleSearch" placeholder="Cherche ton jeu" class="mb-4 p-2 border border-gray-300 rounded-md bg-slate-500">
    </div>
  </template>
  
  <script>
  export default {
    props: {
      onSearch: Function,
    },
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      handleSearch() {
        this.onSearch(this.searchQuery);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles go here */
  </style>
  
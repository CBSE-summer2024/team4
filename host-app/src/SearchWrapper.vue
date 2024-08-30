<template>
    <div id="search-container"></div>
  </template>
  
  <script>
  export default {
    name: 'SearchWrapper',
    async mounted() {
      const { SearchBar } = await import('searchApp/SearchBar');
      const searchBarElement = document.createElement('search-bar');
      this.$el.appendChild(searchBarElement);
    }
  };
  </script>
  
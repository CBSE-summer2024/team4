<template>
  <div id="app">
    <h1>Host App</h1>
    <div class="components-container">
      <!-- Containers for React components and Vue components -->
      <div id="cart-container"></div>
      <component :is="FilterComponent" />
    </div>
  </div>
</template>

<script>
import React from 'react';
import ReactDOM from 'react-dom';
import { defineAsyncComponent } from 'vue';

// Dynamically import React components
const CartComponent = React.lazy(() => import('Cart/Cart'));

// Define async Vue component
const FilterComponent = defineAsyncComponent(() => import('filterApp/FilterComponent'));

export default {
  name: 'App',
  components: {
    // The dynamic component will be rendered using `:is`
  },
  data() {
    return {
      FilterComponent,
    };
  },
  mounted() {
    // Render the Cart component into the container
    ReactDOM.render(
      React.createElement(
        React.Suspense,
        { fallback: React.createElement('div', null, 'Loading Cart...') },
        React.createElement(CartComponent)
      ),
      document.getElementById('cart-container')
    );
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.components-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust space between components as needed */
  width: 100%;
  max-width: 800px; /* Optional: Set a maximum width for the container */
}

h1 {
  margin-bottom: 20px;
}
</style>

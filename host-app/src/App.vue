<template>
  <div id="app">
    <h1>Host App</h1>
    <div class="components-container">
      <div id="cart-container"></div>
      <div id="filter-container">
        <component :is="FilterComponent" />
      </div>
      <div id="search-container"></div>
      <div id="auth-container">
        <div id="signin-container"></div>
        <div id="signup-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import React from 'react';
import ReactDOM from 'react-dom';
import { defineAsyncComponent, h } from 'vue';

const CartComponent = React.lazy(() => import('Cart/Cart'));
const FilterComponent = defineAsyncComponent(() => import('filterApp/FilterComponent'));

export default {
  name: 'App',
  data() {
    return {
      FilterComponent
    };
  },
  async mounted() {
    // Load and render React component
    ReactDOM.render(
      React.createElement(
        React.Suspense,
        { fallback: React.createElement('div', null, 'Loading Cart...') },
        React.createElement(CartComponent)
      ),
      document.getElementById('cart-container')
    );

    // Load Lit component
    await this.loadLitComponent();

    // Load Svelte components
    await this.loadSvelteComponents();
  },
  methods: {
    async loadLitComponent() {
      try {
        const { SearchBar } = await import('searchApp/SearchBar');
        const searchBarElement = document.createElement('search-bar');
        document.getElementById('search-container').appendChild(searchBarElement);
        console.log('Lit component loaded and rendered successfully');
      } catch (error) {
        console.error('Error loading Lit component:', error);
      }
    },
    async loadSvelteComponents() {
      try {
        // Load and render Signin Svelte component
        const { default: SigninComponent } = await import('svelteApp/Signin');
        new SigninComponent({
          target: document.getElementById('signin-container'),
        });

        // Load and render Signup Svelte component
        const { default: SignupComponent } = await import('svelteApp/Signup');
        new SignupComponent({
          target: document.getElementById('signup-container'),
        });

        console.log('Svelte components loaded and rendered successfully');
      } catch (error) {
        console.error('Error loading Svelte components:', error);
      }
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(49, 48, 48);
}

.components-container {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 100%;
  max-width: 800px; 
}

h1 {
  margin-bottom: 20px;
}
</style>

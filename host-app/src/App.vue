<template>
  <div id="app">
    <h1>Host App</h1>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/cart" class="nav-link">Cart</router-link>
      <router-link to="/filter" class="nav-link">Filter</router-link>
      <router-link to="/search" class="nav-link">Search</router-link>
      <router-link to="/signin" class="nav-link">Sign In</router-link>
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  router,
};
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
  background-color: rgb(49, 48, 48);
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 10px 0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #555;
}

.nav-link.active {
  background-color: #42b983;
  color: #fff;
}
</style>

<!-- src/components/NavBar.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/filter">Filter</router-link></li>
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/signin">Sign In</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
  }
  
  li {
    margin: 0;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  a.router-link-active {
    font-weight: bold;
  }
  </style>
  
<script>
	import Navbar from './Navbar.svelte';
	import Router from 'svelte-spa-router';
	import Signup from './Signup.svelte';
	import Signin from './Signin.svelte';
  
	const routes = {
	  '/signup': Signup,
	  '/signin': Signin
	};
  </script>
  
  <main>
	<Navbar />
	<Router {routes} />
  </main>
  
  <style>
	main {
	  padding: 20px;
	}
  </style>
  
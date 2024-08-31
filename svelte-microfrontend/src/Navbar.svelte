<script>
    import { push } from 'svelte-spa-router';
    
    function navigateTo(route) {
      push(route);
    }
  </script>
  
  <nav>
    <ul>
      <li><a href="/svelte-microfrontend/src/Signup.svelte" on:click|preventDefault={() => navigateTo('/signup')}>Sign Up</a></li>
      <li><a href="/svelte-microfrontend/src/Signup.svelte" on:click|preventDefault={() => navigateTo('/signin')}>Sign In</a></li>
    </ul>
  </nav>
  
  <style>
    nav {
      background-color: #333;
      padding: 10px;
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
    }
  
    li {
      margin: 0 15px;
    }
  
    a {
      color: white;
      text-decoration: none;
      font-size: 16px;
    }
  
    a:hover {
      text-decoration: underline;
    }
  </style>
  
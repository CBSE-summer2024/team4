<script>
  import { push } from 'svelte-spa-router';

  let email = '';
  let password = '';

  function handleSubmit() {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (storedCredentials && storedCredentials.email === email && storedCredentials.password === password) {
      alert(`Logged in with email: ${email}`);
    } else {
      alert('Try again. Invalid email or password.');
    }
  }

  function navigateToSignUp() {
    push('/signup');
  }
</script>

<main>
  <h1>Sign In</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Sign In</button>
    <p>Don't have an account? <button type="button" on:click={navigateToSignUp} class="sign-up-link">Sign Up</button></p>
  </form>
</main>

<style>
  main {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
    font-family: 'Arial', sans-serif;
  }

  input {
    padding: 12px;
    font-size: 16px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  button {
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  p {
    text-align: center;
    margin-top: 20px;
    font-family: 'Arial', sans-serif;
  }

  .sign-up-link {
    background: none;
    border: none;
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
  }

  .sign-up-link:hover {
    text-decoration: underline;
  }
</style>

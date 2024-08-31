<script>
  import { replace } from 'svelte-spa-router';

  let email = '';
  let password = '';

  function handleSubmit() {
    if (email && password) {
      // Store user credentials in localStorage
      localStorage.setItem('userCredentials', JSON.stringify({ email, password }));
      alert(`Signed up with email: ${email}`);
      replace('/signin'); // Redirect to sign in page
    } else {
      alert('Please enter both email and password.');
    }
  }

  function navigateToSignIn(event) {
    event.preventDefault(); // Prevent default anchor tag behavior
    replace('/signin'); // Correct route path
  }
</script>

<main>
  <h1>Sign Up</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Sign Up</button>
    <p>Already have an account? <a href="/signin" on:click|preventDefault={navigateToSignIn} class="sign-in-link">Sign In</a></p>
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

  .sign-in-link {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
  }

  .sign-in-link:hover {
    text-decoration: underline;
  }
</style>

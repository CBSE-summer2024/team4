
# Team4: Authentication Micro Frontend

## Overview

This documentation provides detailed instructions on setting up and running the Authentication micro frontend, which includes Sign Up and Sign In components, using Svelte with Webpack Module Federation.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Sign Up Component](#sign-up-component)
- [Sign In Component](#sign-in-component)
- [Webpack Configuration](#webpack-configuration)
- [Styling](#styling)
- [Integration with Other Micro Frontends](#integration-with-other-micro-frontends)
- [Troubleshooting](#troubleshooting)

## Project Structure

The Authentication micro frontend has the following structure:


- **`src/components/`**: Contains the Sign Up and Sign In Svelte components.
- **`src/App.svelte`**: The root component that initializes the application.
- **`src/main.js`**: Entry point for the application.
- **`src/routes.js`**: Defines the routes for the Sign Up and Sign In components.

## Installation

To set up the Authentication micro frontend, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd authentication-microfrontend
    ```

2. **Install Dependencies**: Install the required dependencies by running:

    ```bash
    npm install
    ```

## Running the Application

To run the Authentication micro frontend:

1. **Start the Development Server**: Use the following command to start the application:

    ```bash
    npm start
    ```

    This will start the development server on the specified port (e.g., `localhost:3001`).

2. **Access the Application**: Open your web browser and navigate to:

    ```
    http://localhost:3001
    ```

## Sign Up Component

The `Signup.svelte` component handles user registration. Users can input their email and password, which are stored in `localStorage` for later use during sign-in.

### Key Features:

- **Form Validation**: Ensures that both email and password fields are filled out before submission.
- **Data Storage**: User credentials are stored in the browser's `localStorage`.
- **Navigation**: After successful sign-up, users are redirected to the Sign In page.

### Code Snippet:

```svelte
<script>
  import { replace } from 'svelte-spa-router';

  let email = '';
  let password = '';

  function handleSubmit() {
    if (email && password) {
      localStorage.setItem('userCredentials', JSON.stringify({ email, password }));
      alert(`Signed up with email: ${email}`);
      replace('/signin');
    } else {
      alert('Please enter both email and password.');
    }
  }

  function navigateToSignIn(event) {
    event.preventDefault();
    replace('/signin');
  }
</script>
```
## Sign In Component

The `Signin.svelte` component allows users to log in using their registered email and password. It compares the input with the data stored in `localStorage`.

### Key Features:

- **Credential Verification**: Compares user input with stored credentials to validate login.
- **Error Handling**: Alerts the user if the credentials are incorrect.
- **Navigation**: Provides a method to navigate to the Sign Up page if the user doesn't have an account.

### Code Snippet:

```svelte
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

  <h1>Sign In</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Sign In</button>
  </form>
  <p>Don't have an account? <a href="#" on:click|preventDefault={navigateToSignUp}>Sign Up</a></p>
</main>
```

## Webpack Configuration

The Authentication micro frontend uses Webpack for module bundling. Webpack Module Federation is configured to enable integration with other micro frontends.

### Key Configuration:

- **Module Federation**: Allows sharing of modules across different micro frontends.
- **Development Server**: Configures the development server to run on a specific port.

### Sample `webpack.config.js`:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: 'svelte-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Signup': './src/components/Signup.svelte',
        './Signin': './src/components/Signin.svelte',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 
```
## Styling

The components in the Authentication micro frontend are styled using inline styles directly within the Svelte files. The design focuses on being modern, user-friendly, and accessible, with responsiveness for various device sizes.

### Example Styles:

Here are some basic styles used for the Sign Up and Sign In components:

```css
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

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
```
## Integration with Other Micro Frontends

The Authentication micro frontend is designed to be easily integrated with other micro frontends within the application ecosystem (e.g., Cart, Search, Filter). The integration is facilitated using Webpack Module Federation, which allows seamless sharing of components across different micro frontends.

### Steps for Integration:

1. **Expose Components**: Use Webpack Module Federation to expose the Sign Up and Sign In components so that they can be accessed by other micro frontends. This is done in the `webpack.config.js` file:

    ```javascript
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Signup': './src/components/Signup.svelte',
        './Signin': './src/components/Signin.svelte',
      },
      shared: ['svelte', 'svelte-spa-router'],
    }),
    ```

2. **Import Components**: In other micro frontends, import the exposed components using dynamic imports. This allows the components to be loaded only when needed, reducing the initial load time:

    ```javascript
    // Example in another micro frontend
    const Signup = React.lazy(() => import('auth/Signup'));
    const Signin = React.lazy(() => import('auth/Signin'));
    ```

3. **Configure Routes**: Ensure that the routes are correctly set up in the parent or host application to handle navigation between different micro frontends. You can define routes to include the Sign Up and Sign In components:

    ```javascript
    import { Router } from 'svelte-routing';
    import Signup from 'auth/Signup';
    import Signin from 'auth/Signin';

    const routes = [
      { path: '/signup', component: Signup },
      { path: '/signin', component: Signin },
      // Other routes...
    ];

    <Router {routes} />
    ```

4. **Shared State and Communication**: If necessary, set up shared state management (e.g., using a global store or a shared context) to allow communication between different micro frontends. This helps in maintaining consistent state, such as user authentication status, across the application.

### Example Integration Scenario:

- **Cart Micro Frontend**: After successful sign-in, a user navigates to the cart page. The cart micro frontend can dynamically import the Sign In component from the authentication micro frontend for authentication checks.

- **Search Micro Frontend**: The search micro frontend can leverage the same authentication state to display user-specific search results or preferences.

### Benefits of Integration:

- **Modular Architecture**: Each micro frontend can be developed, tested, and deployed independently, reducing the complexity of the overall system.
- **Code Reusability**: The same Sign Up and Sign In components can be reused across multiple applications, ensuring consistent user experience.
- **Scalability**: As the application grows, new micro frontends can be added or existing ones modified without disrupting the overall system.

### Notes:

- Ensure that all micro frontends use compatible versions of shared libraries (e.g., Svelte, routers) to prevent conflicts.
- Test the integration thoroughly to ensure that communication and data sharing between micro frontends work as expected.


### Key Notes:
- Properly closing the code block with backticks ensures that GitHub Markdown renders the code correctly.
- Replace placeholders like `<repository-url>` with the actual repository URL for your project.
- Feel free to update the "Troubleshooting" section with more specific issues and solutions relevant to your project as you encounter them.

This should now provide a clear, structured, and complete README file that is easy to read and understand. Let me know if you need further assistance or modifications!


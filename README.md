# Horizontal Microfrontend Documentation

### You can view test cases via this link :  [Gerkhin Test Cases For Mart Ps](https://docs.google.com/document/d/1rSU8LBtgQNtG43xK3oNaJX3DHfF4xexsDYIpK83tEtU/edit?usp=sharing)

[Screen Recording](https://youtu.be/dDNqFKgK-ro)

# Project Overview
This documentation describes the setup and integration of a horizontal microfrontend architecture using the following technologies:
React: Cart component
Vue.js: Filter component
LitElement: Search component
Svelte: Authentication system (Sign Up, Sign In)
The micro frontends are integrated using Module Federation and Webpack, allowing each component to run independently while being seamlessly combined into a single application.
Project Structure
```
/TEAM4
    /host-app
    /cart-microfronend
    /filter-component
    /lit-search-bar
    /svelte-microfrontend
```
#### host-app: The main application that loads and orchestrates the microfrontends.
#### react-cart: The microfrontend for the Cart, built using React.
#### vue-filter: The microfrontend for the Filter, built using Vue.js.
#### lit-search: The microfrontend for the Search, built using LitElement.
#### svelte-auth: The microfrontend for Authentication (Sign Up, Sign In), built using Svelte.



# Integration Approach
### 1. Setting Up Webpack Module Federation
Module Federation is a Webpack feature that allows you to share and dynamically load code (modules) from different applications (referred to as remotes) into a host application. Each remote application exposes its components so that the host can use them as if they were part of its codebase.

### 2. Defining the Host and Remote Applications
Host Application: The main application built with Vue.js. This application loads and displays components from various remote applications.
Remote Applications: These are independent applications, each built using different frameworks (React, Vue, Lit, and Svelte). Each remote app exposes certain components to be consumed by the host app.

### 3. Configuring Webpack in the Remote Applications
Each remote application is configured with ModuleFederationPlugin in their Webpack configuration files (webpack.config.js). This plugin is used to expose the components that the host application will consume.


#### React App (Cart): Exposes a Cart component.
#### Vue App (Filter): Exposes a FilterComponent.
#### Lit App (Search): Exposes a SearchBar component.
#### Svelte App (Auth): Exposes Signin and Signup components.

Example configuration for a remote app:


```
new ModuleFederationPlugin({
  name: 'cartApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Cart': './src/Cart', // Exposes the Cart component
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});
```
### 4. Configuring the Host Application
The host application is also configured with ModuleFederationPlugin in its Webpack configuration. The host declares dependencies on the remote applications, specifying their URLs and the components it wants to load.

#### Example configuration for the host app:
```
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    Cart: 'cartApp@http://localhost:3002/remoteEntry.js',
    Filter: 'filterApp@http://localhost:3003/remoteEntry.js',
    Search: 'searchApp@http://localhost:3004/remoteEntry.js',
    SvelteApp: 'svelteApp@http://localhost:3005/remoteEntry.js',
  },
  shared: { vue: { singleton: true } },
});
```
### 5. Loading Remote Components in the Host Application
In the host application, you load and render remote components using dynamic imports. For React, Vue, and Lit components, this is straightforward. However, Svelte components require a wrapper to integrate them with Vue.js.

#### React Component: Loaded using React.lazy() and ReactDOM.render().
#### Vue Component: Loaded using defineAsyncComponent().
#### Lit Component: Loaded using document.createElement() and attached to the DOM.
#### Svelte Component: Loaded using a custom wrapper function that creates and mounts the #### Svelte component in a Vue component's lifecycle.

### 6. Handling Asynchronous Component Loading
Since these components are loaded dynamically, you used async methods in the host application to handle the loading process. This ensures that each component is loaded only when needed and that any potential errors are gracefully handled.

#### Example:
```
methods: {
  async loadLitComponent() {
    try {
      const { SearchBar } = await import('searchApp/SearchBar');
      const searchBarElement = document.createElement('search-bar');
      document.getElementById('search-container').appendChild(searchBarElement);
    } catch (error) {
      console.error('Error loading Lit component:', error);
    }
  },
  async loadSvelteComponents() {
    try {
      const { default: SigninComponent } = await import('svelteApp/Signin');
      new SigninComponent({
        target: document.getElementById('signin-container'),
      });
    } catch (error) {
      console.error('Error loading Svelte components:', error);
    }
  },
}
```

# Prerequisites
Ensure you have Node.js and npm installed on your machine.
Setup Instructions
## 1. Host Application Setup
### Navigate to the host-app directory:

```cd /root-directory/host-app```


### Initialize the project:
```npm init```

### Install Webpack Dev Server:

``` npm install --save-dev webpack-dev-server``` 
### Run the application:
```npm start -- --port 3001```

## 2. React Cart Component Setup
### Navigate to the react-cart directory:
```cd /root-directory/react-cart```


### Initialize the project:
```npm init```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3003```


# 3. Vue.js Filter Component Setup
### Navigate to the vue-filter directory:
```cd /root-directory/vue-filter```


### Initialize the project:
```npm init```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3002```


## 4. LitElement Search Component Setup
### Navigate to the lit-search directory:
```cd /root-directory/lit-search```


### Initialize the project:
```npm init```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```

### install Babel Loader:
```npm install --save-dev babel-loader @babel/core @babel/preset-env```


### Run the application:
```npm start -- --port 3004```


## 5. Svelte Authentication Component Setup
### Navigate to the svelte-auth directory:

```cd /root-directory/svelte-auth```


### Initialize the project:
```npm init```


### Install Webpack Dev Server:

```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3005```
### example Configuration for React Cart Component

### const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

```
module.exports = {
  // other configurations
  plugins: [
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/Cart', // Path to the Cart component
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
  // other configurations
};
```
### Running the Complete Application
### Once all micro frontends are set up and running on their respective ports, the host application can be run to integrate all the components.
### Start the host application:
```npm start -- --port 3001```


### Ensure all other micro frontends are running:
```React Cart: http://localhost:3003```
```Vue Filter: http://localhost:3002```
```Lit Search: http://localhost:3004```
```Svelte Auth: http://localhost:3005```
### Access the host application on http://localhost:3001 to see the integrated micro frontends in action.


## High Level Design Architecture For Microfrontend Mart PS  :


![mart](https://github.com/user-attachments/assets/dcde6d9b-f9de-4bb3-8a3b-a237f277dc0e)


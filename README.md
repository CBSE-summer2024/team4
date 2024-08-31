# Horizontal Microfrontend Documentation

### You can view test cases via this link :  [Gerkhin Test Cases For Mart Ps](https://docs.google.com/document/d/1rSU8LBtgQNtG43xK3oNaJX3DHfF4xexsDYIpK83tEtU/edit?usp=sharing)

## Overview
This documentation describes the setup and integration of a horizontal microfrontend architecture using the following technologies:
React: Cart component
Vue.js: Filter component
LitElement: Search component
Svelte: Authentication system (Sign Up, Sign In)
The micro frontends are integrated using Module Federation and Webpack, allowing each component to run independently while being seamlessly combined into a single application.
Project Structure
```
/root-directory
    /host-app
    /react-cart
    /vue-filter
    /lit-search
    /svelte-auth
```
### host-app: The main application that loads and orchestrates the microfrontends.
### react-cart: The microfrontend for the Cart, built using React.
### vue-filter: The microfrontend for the Filter, built using Vue.js.
### lit-search: The microfrontend for the Search, built using LitElement.
### svelte-auth: The microfrontend for Authentication (Sign Up, Sign In), built using Svelte.

# Prerequisites
Ensure you have Node.js and npm installed on your machine.
Setup Instructions
1. Host Application Setup
Navigate to the host-app directory:

```cd /root-directory/host-app```


### Initialize the project:
```npm init -y```

### Install Webpack Dev Server:

``` npm install --save-dev webpack-dev-server``` 
### Run the application:
```npm start -- --port 3001```

## 2. React Cart Component Setup
### Navigate to the react-cart directory:
```cd /root-directory/react-cart```


### Initialize the project:
```npm init -y```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3003```


# 3. Vue.js Filter Component Setup
### Navigate to the vue-filter directory:
```cd /root-directory/vue-filter```


### Initialize the project:
```npm init -y```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3002```


## 4. LitElement Search Component Setup
### Navigate to the lit-search directory:
```cd /root-directory/lit-search```


### Initialize the project:
```npm init -y```


### Install Webpack Dev Server:
```npm install --save-dev webpack-dev-server```


### Run the application:
```npm start -- --port 3004```


## 5. Svelte Authentication Component Setup
### Navigate to the svelte-auth directory:

```cd /root-directory/svelte-auth```


### Initialize the project:
```npm init -y```


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

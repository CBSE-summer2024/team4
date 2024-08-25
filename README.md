# Auth Microfrontend
Overview
The Auth Microfrontend is an authentication module designed as part of a micro frontend architecture using Angular. It provides user authentication features, including login and sign-up functionality, and is integrated using Webpack's Module Federation.

Features
Micro Frontend Architecture: Modular and scalable authentication system.
Angular Framework: Built with Angular for robust performance and easy integration.
Lazy Loading: Efficient module loading using Angular’s lazy loading feature.
Routing: Configurable and extendable routing between authentication components.
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js: >= 14.x
npm: >= 6.x or yarn >= 1.x
Angular CLI: >= 12.x
Installation
Follow the steps below to set up and run the project locally.

1. Clone the Repository
Clone the repository to your local machine:

bash
نسخ الكود
git clone https://github.com/your-username/auth-microfrontend.git
cd auth-microfrontend
2. Install Dependencies
Install the required dependencies:

bash
نسخ الكود
npm install
Or, if you are using Yarn:

bash
نسخ الكود
yarn install
3. Set Up Webpack Module Federation
Make sure Webpack Module Federation is set up by installing the necessary packages:

bash
نسخ الكود
ng add @angular-architects/module-federation
If you encounter a validation error regarding the port, make sure your angular.json is configured correctly.

4. Run the Development Server
Start the Angular development server:

bash
نسخ الكود
ng serve
Navigate to http://localhost:4200/ in your browser to see the login and sign-up components in action.

Project Structure
The project structure follows a modular approach:

arduino
نسخ الكود
src/
├── app/
│   ├── auth/
│   │   ├── auth-routing.module.ts
│   │   ├── auth.module.ts
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   ├── login.component.css
│   │   ├── signup/
│   │   │   ├── signup.component.ts
│   │   │   ├── signup.component.html
│   │   │   ├── signup.component.css
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
Configuration
Webpack Configuration
The webpack.config.js is set up to enable Module Federation. Ensure the following configurations are in place:

javascript
نسخ الكود
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "authMicrofrontend",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },
        // Configure remotes or exposes as needed
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          ...sharedMappings.getDescriptors()
        })
    }),
    sharedMappings.getPlugin()
  ],
};
Routing Configuration
Ensure routing is properly set up in the auth-routing.module.ts and app-routing.module.ts to enable navigation between the login and sign-up components.

Usage
After setting up the project, you can access the authentication module through the following routes:

Login: http://localhost:4200/auth/login
Sign Up: http://localhost:4200/auth/signup

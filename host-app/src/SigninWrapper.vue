<template>
    <div id="signin-container"></div>
  </template>
  
  <script>
  export default {
    name: 'SigninWrapper',
    async mounted() {
      const { default: SigninComponent } = await import('svelteApp/Signin');
      new SigninComponent({
        target: this.$el,
      });
    }
  };
  </script>
  
<template>
    <div id="signup-container"></div>
  </template>
  
  <script>
  export default {
    name: 'SignupWrapper',
    async mounted() {
      const { default: SignupComponent } = await import('svelteApp/Signup');
      new SignupComponent({
        target: this.$el,
      });
    }
  };
  </script>
  
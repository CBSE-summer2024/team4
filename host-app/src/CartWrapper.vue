<template>
  <div id="cart-container"></div>
</template>

<script>
import React from 'react';
import ReactDOM from 'react-dom';
const CartComponent = React.lazy(() => import('Cart/Cart'));

export default {
  name: 'CartWrapper',
  mounted() {
    ReactDOM.render(
      React.createElement(
        React.Suspense,
        { fallback: React.createElement('div', null, 'Loading Cart...') },
        React.createElement(CartComponent)
      ),
      this.$el
    );
  },
  beforeUnmount() {
    ReactDOM.unmountComponentAtNode(this.$el);
  }
};
</script>

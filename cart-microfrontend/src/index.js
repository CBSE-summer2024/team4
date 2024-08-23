import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './components/Cart';

class App extends React.Component {
  render() {
    return <Cart />;
  }
}
const PUBLIC_URL = process.env.PUBLIC_URL || '';


ReactDOM.render(<App />, document.getElementById('root'));

window.CartComponent = Cart;

import React, { useState, useEffect } from 'react';
import './cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); // Fake API endpoint
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: 1,
        }));
        setItems(formattedData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAddItem = () => {
    const { name, price, quantity } = newItem;
    if (name && price && quantity) {
      const newItemObj = {
        id: items.length + 1,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };
      setItems([...items, newItemObj]);
      setNewItem({ name: '', price: '', quantity: '' });
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  return (
    <div className="cart-container">
      <header className="cart-header">Shopping Cart</header>

      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
      />

      <table className="product-table">
        <thead className="product-table-header">
          <tr>
            <th className="header-item">Product</th>
            <th className="header-item">Price</th>
            <th className="header-item">Quantity</th>
            <th className="header-item">Total</th>
            <th className="header-item">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="product-row">
              <td className="product-cell">{item.name}</td>
              <td className="product-cell">${item.price.toFixed(2)}</td>
              <td className="product-cell">
                <div className="quantity-container">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="product-cell">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="product-cell">
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grand-total">
        <span>Total:</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;

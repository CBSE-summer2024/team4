import React, { useState } from 'react';
import './cart.css'; 

const Cart = () => {
  const initialItems = [
    { id: 1, name: 'Apple', price: 1.20, quantity: 3 },
    { id: 2, name: 'Banana', price: 0.50, quantity: 5 },
    { id: 3, name: 'Orange', price: 0.80, quantity: 2 },
    { id: 4, name: 'Milk', price: 2.50, quantity: 1 },
    { id: 5, name: 'Bread', price: 1.00, quantity: 2 },
    { id: 6, name: 'Cheese', price: 3.00, quantity: 1 },
    { id: 7, name: 'Eggs', price: 2.00, quantity: 12 },
    { id: 8, name: 'Chicken Breast', price: 5.00, quantity: 1 },
    { id: 9, name: 'Rice', price: 1.75, quantity: 4 },
    { id: 10, name: 'Pasta', price: 1.60, quantity: 3 },
  ];

  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

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

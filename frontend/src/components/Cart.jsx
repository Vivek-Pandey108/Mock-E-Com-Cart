import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onRemove, onUpdateQty }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
            <div className="item-actions">
              <div className="qty-control">
                <button onClick={() => onUpdateQty(item._id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQty(item._id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => onUpdateQty(item._id, item.quantity + 1)}>+</button>
              </div>
              <span className="item-total">₹{item.price * item.quantity}</span>
              <button
                className="remove-btn"
                onClick={() => onRemove(item._id)}
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row">
          <span>Tax (0%):</span>
          <span>₹0</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;

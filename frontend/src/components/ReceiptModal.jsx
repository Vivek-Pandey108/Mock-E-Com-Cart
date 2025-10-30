import React from 'react';
import './ReceiptModal.css';

const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="receipt-header">
          <h2>✓ Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Receipt Details</h3>
            <div className="receipt-row">
              <span>Receipt ID:</span>
              <span className="receipt-value">{receipt.receiptId}</span>
            </div>
            <div className="receipt-row">
              <span>Date & Time:</span>
              <span className="receipt-value">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <div className="receipt-row">
              <span>Name:</span>
              <span className="receipt-value">{receipt.customerName}</span>
            </div>
            <div className="receipt-row">
              <span>Email:</span>
              <span className="receipt-value">{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="receipt-section total-section">
            <div className="receipt-total">
              <span>Total Amount:</span>
              <span className="total-value">₹{receipt.total}</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p className="status-success">✓ {receipt.status}</p>
            <p className="thank-you">We've sent a confirmation to your email.</p>
          </div>
        </div>

        <button className="close-receipt-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;

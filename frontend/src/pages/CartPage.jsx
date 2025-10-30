import React, { useState } from 'react';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';

const CartPage = ({ cartItems, onRemove, onUpdateQty }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (formData) => {
    setLoading(true);
    try {
      const receiptData = {
        receiptId: 'REC-' + Date.now(),
        customerName: formData.name,
        customerEmail: formData.email,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        timestamp: new Date(),
        status: 'Success',
      };
      setReceipt(receiptData);
      setShowCheckout(false);
    } catch (error) {
      alert('Checkout failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <Cart 
        cartItems={cartItems} 
        onRemove={onRemove} 
        onUpdateQty={onUpdateQty}
      />
      
      {cartItems.length > 0 && (
        <div className="text-center py-8">
          <button 
            className="btn-primary text-lg px-8 py-3"
            onClick={() => setShowCheckout(true)}
          >
            💳 Proceed to Checkout
          </button>
        </div>
      )}

      {showCheckout && (
        <CheckoutForm 
          cartItems={cartItems} 
          onCheckout={handleCheckout}
          loading={loading}
        />
      )}

      <ReceiptModal 
        receipt={receipt} 
        onClose={() => setReceipt(null)}
      />
    </div>
  );
};

export default CartPage;

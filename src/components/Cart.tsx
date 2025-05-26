
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
      <div className="bg-white w-full max-w-md max-h-[80vh] rounded-t-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingBag className="mr-2" size={24} />
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-green-600">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold text-green-600">₹{total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

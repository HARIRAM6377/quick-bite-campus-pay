
import React from 'react';
import { X, ShoppingBag, CreditCard } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-end">
      <div className="bg-white w-full max-w-md max-h-[85vh] rounded-t-3xl overflow-hidden shadow-2xl border-t border-gray-200">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-2xl font-bold">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={48} className="opacity-50" />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add some delicious items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-emerald-600 text-lg">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">₹{total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <CreditCard size={20} />
              <span>Proceed to Payment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React from 'react';
import { X, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import { mobileUtils } from '../utils/mobileUtils';

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

  const handleCheckout = async () => {
    await mobileUtils.hapticFeedback('Heavy');
    await mobileUtils.showToast('Processing your order...', 'short');
    onCheckout();
  };

  const handleClose = async () => {
    await mobileUtils.hapticFeedback('Light');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex justify-center items-end">
      <div className="bg-white w-full max-w-md max-h-[85vh] rounded-t-3xl overflow-hidden shadow-2xl border-t-4 border-gradient-to-r from-purple-500 to-pink-500 relative">
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-3 rounded-2xl shadow-xl">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <div className="flex items-center space-x-2 text-purple-200">
                  <Sparkles size={16} />
                  <span className="text-sm">Fresh & Delicious</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-2xl transition-all duration-200 transform hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <ShoppingBag size={48} className="opacity-50" />
              </div>
              <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add some delicious items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="group transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center p-5 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl border-2 border-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center font-bold text-purple-600 shadow-inner">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 flex items-center space-x-2">
                          <span>₹{item.price}</span>
                          <span className="text-gray-400">×</span>
                          <span className="font-semibold text-purple-600">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600 text-xl">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Sparkles className="text-purple-500" size={24} />
                <span>Total:</span>
              </span>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                ₹{total}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <CreditCard size={24} />
              <span>Proceed to Payment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

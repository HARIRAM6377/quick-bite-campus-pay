
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
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-2xl overflow-hidden shadow-2xl border-t-4 border-gradient-to-r from-purple-500 to-pink-500 relative">
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2.5 rounded-xl shadow-xl">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Cart</h2>
                <div className="flex items-center space-x-2 text-purple-200">
                  <Sparkles size={14} />
                  <span className="text-sm">Fresh & Delicious</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 transform hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white max-h-[60vh]">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <ShoppingBag size={40} className="opacity-50" />
              </div>
              <p className="text-base font-medium text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add some delicious items to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="group transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center font-bold text-purple-600 shadow-inner text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-purple-700 transition-colors truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 flex items-center space-x-1 text-xs">
                          <span>₹{item.price}</span>
                          <span className="text-gray-400">×</span>
                          <span className="font-semibold text-purple-600">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600 text-base ml-2 flex-shrink-0">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50"></div>
            
            <div className="flex justify-between items-center mb-4 relative z-10">
              <span className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <Sparkles className="text-purple-500" size={20} />
                <span>Total:</span>
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                ₹{total}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white py-3 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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

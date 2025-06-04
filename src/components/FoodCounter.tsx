
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { mobileUtils } from '../utils/mobileUtils';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface FoodCounterProps {
  title: string;
  items: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  cartItems: { [key: string]: number };
  color: string;
  icon: string;
}

const FoodCounter = ({ title, items, onAddToCart, onRemoveFromCart, cartItems, color, icon }: FoodCounterProps) => {
  const handleAddToCart = async (item: FoodItem) => {
    await mobileUtils.hapticFeedback('Light');
    onAddToCart(item);
    await mobileUtils.showToast(`${item.name} added to cart!`, 'short');
  };

  const handleRemoveFromCart = async (itemId: string) => {
    await mobileUtils.hapticFeedback('Light');
    onRemoveFromCart(itemId);
  };

  return (
    <div className="mb-6">
      <div className={`${color} p-4 rounded-t-2xl shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
        <div className="relative flex items-center justify-center space-x-2">
          <div className="text-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-white text-center drop-shadow-lg">
            {title}
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-3">
          <div className="grid grid-cols-1 gap-3">
            {items.map((item) => {
              const quantity = cartItems[item.id] || 0;
              return (
                <div key={item.id} className="group">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                    
                    <div className="flex items-center space-x-3 flex-1 pr-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop&crop=faces`} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-600 font-bold text-lg">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {quantity > 0 && (
                        <>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
                          >
                            <Minus size={16} strokeWidth={3} />
                          </button>
                          <div className="min-w-[2rem] text-center">
                            <span className="font-bold text-lg bg-gray-100 px-2 py-1 rounded-lg shadow-inner border border-gray-200 text-gray-800">
                              {quantity}
                            </span>
                          </div>
                        </>
                      )}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg flex items-center justify-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCounter;

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
    <div className="mb-8">
      <div className={`${color} p-6 rounded-t-3xl shadow-2xl relative overflow-hidden`}>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative flex items-center justify-center space-x-3">
          <div className="text-4xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-white text-center drop-shadow-2xl tracking-wide">
            {title}
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-b-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => {
              const quantity = cartItems[item.id] || 0;
              return (
                <div key={item.id} className="group relative">
                  <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-center space-x-4 flex-1 relative z-10">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <img 
                          src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop&crop=faces`} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-gray-900 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-600 font-bold text-xl">₹{item.price}</span>
                          <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                          <span className="text-gray-500 text-sm font-medium">Fresh & Hot</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      {quantity > 0 && (
                        <>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-2xl flex items-center justify-center hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95"
                          >
                            <Minus size={20} strokeWidth={3} />
                          </button>
                          <div className="min-w-[3rem] text-center">
                            <span className="font-bold text-2xl bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-2 rounded-xl shadow-inner border-2 border-gray-200 text-gray-800">
                              {quantity}
                            </span>
                          </div>
                        </>
                      )}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95"
                      >
                        <Plus size={20} strokeWidth={3} />
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

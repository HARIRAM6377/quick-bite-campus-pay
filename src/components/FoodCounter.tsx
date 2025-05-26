
import React from 'react';
import { Plus, Minus } from 'lucide-react';

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
  return (
    <div className="mb-8">
      <div className={`${color} p-6 rounded-t-2xl shadow-xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="relative flex items-center justify-center space-x-3">
          <span className="text-3xl">{icon}</span>
          <h2 className="text-xl font-bold text-white text-center drop-shadow-lg">{title}</h2>
        </div>
      </div>
      <div className="bg-white rounded-b-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => {
              const quantity = cartItems[item.id] || 0;
              return (
                <div key={item.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h3>
                    <p className="text-emerald-600 font-bold text-lg">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {quantity > 0 && (
                      <>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold text-xl min-w-[2.5rem] text-center bg-gradient-to-br from-gray-100 to-gray-200 px-3 py-1 rounded-lg shadow-inner">{quantity}</span>
                      </>
                    )}
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <Plus size={18} />
                    </button>
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

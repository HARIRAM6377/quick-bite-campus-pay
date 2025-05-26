
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
}

const FoodCounter = ({ title, items, onAddToCart, onRemoveFromCart, cartItems, color }: FoodCounterProps) => {
  return (
    <div className="mb-6">
      <div className={`${color} text-white p-4 rounded-t-xl shadow-lg`}>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
      <div className="bg-white rounded-b-xl shadow-lg p-4 border-l-4" style={{ borderLeftColor: color.includes('orange') ? '#f97316' : color.includes('green') ? '#22c55e' : color.includes('red') ? '#ef4444' : color.includes('purple') ? '#a855f7' : color.includes('yellow') ? '#eab308' : '#3b82f6' }}>
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => {
            const quantity = cartItems[item.id] || 0;
            return (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {quantity > 0 && (
                    <>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">{quantity}</span>
                    </>
                  )}
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodCounter;


import React from 'react';
import { Bell, User, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
  isAdmin?: boolean;
}

const Header = ({ cartItems, onCartClick, isAdmin = false }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">College Canteen</h1>
            <p className="text-blue-100 text-sm">
              {isAdmin ? 'Admin Panel' : 'Order Online'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {!isAdmin && (
              <button 
                onClick={onCartClick}
                className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
            )}
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

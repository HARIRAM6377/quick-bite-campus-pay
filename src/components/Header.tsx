
import React from 'react';
import { Bell, User, ShoppingCart, Coffee } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
  isAdmin?: boolean;
}

const Header = ({ cartItems, onCartClick, isAdmin = false }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-b border-slate-700">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl shadow-lg">
              <Coffee size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                College Canteen
              </h1>
              <p className="text-slate-300 text-sm font-medium">
                {isAdmin ? 'Admin Dashboard' : 'Digital Ordering'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isAdmin && (
              <button 
                onClick={onCartClick}
                className="relative p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {cartItems}
                  </span>
                )}
              </button>
            )}
            <button className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Bell size={20} />
            </button>
            <button className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

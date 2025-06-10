
import React from 'react';
import { Bell, User, ShoppingCart, Coffee } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
  isAdmin?: boolean;
}

const Header = ({ cartItems, onCartClick, isAdmin = false }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white shadow-2xl border-b border-purple-700/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="max-w-md mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-2 rounded-xl shadow-xl transform hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Coffee size={24} className="text-white drop-shadow-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg truncate">
                Sathyabama Canteen
              </h1>
              <p className="text-purple-200 text-xs font-medium flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
                <span className="truncate">{isAdmin ? 'Admin Dashboard' : 'Digital Ordering'}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {!isAdmin && (
              <button 
                onClick={onCartClick}
                className="relative p-2.5 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-xl hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={18} className="drop-shadow-lg" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 via-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-xl animate-bounce border border-white">
                    {cartItems > 99 ? '99+' : cartItems}
                  </span>
                )}
              </button>
            )}
            <button className="p-2.5 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-xl hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95">
              <Bell size={18} className="drop-shadow-lg" />
            </button>
            <button className="p-2.5 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-xl hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95">
              <User size={18} className="drop-shadow-lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

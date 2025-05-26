
import React, { useState } from 'react';
import Header from '../components/Header';
import FoodCounter from '../components/FoodCounter';
import Cart from '../components/Cart';
import Bill from '../components/Bill';
import AdminPanel from '../components/AdminPanel';
import { menuData } from '../data/menuData';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  studentName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  timestamp: string;
  status: 'preparing' | 'ready' | 'delivered';
}

const Index = () => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentBill, setCurrentBill] = useState<any>(null);

  const addToCart = (item: any) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartItemsArray = (): CartItem[] => {
    const allItems = [
      ...menuData.juices,
      ...menuData.dosa,
      ...menuData.vegChinese,
      ...menuData.nonVegChinese,
      ...menuData.biryani,
      ...menuData.friedChicken
    ];

    return Object.entries(cartItems).map(([id, quantity]) => {
      const item = allItems.find(item => item.id === id);
      return {
        id,
        name: item?.name || '',
        price: item?.price || 0,
        quantity
      };
    }).filter(item => item.quantity > 0);
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleCheckout = () => {
    const items = getCartItemsArray();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `ORD${Date.now()}`;
    
    const newOrder: Order = {
      id: orderId,
      studentName: 'Student User',
      items: items,
      total: total,
      timestamp: new Date().toLocaleString(),
      status: 'preparing'
    };

    setOrders(prev => [...prev, newOrder]);
    
    setCurrentBill({
      orderId,
      items: items,
      total: total,
      timestamp: new Date().toLocaleString(),
      status: 'preparing'
    });

    setCartItems({});
    setIsCartOpen(false);
    setIsBillOpen(true);
  };

  const handleMarkDelivered = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'delivered' } : order
    ));
    
    if (currentBill && currentBill.orderId === orderId) {
      setCurrentBill(null);
      setIsBillOpen(false);
    }
  };

  if (isAdminPanel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header cartItems={0} onCartClick={() => {}} isAdmin={true} />
        <div className="p-6">
          <Button 
            onClick={() => setIsAdminPanel(false)}
            className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Switch to Student Panel
          </Button>
        </div>
        <AdminPanel orders={orders} onMarkDelivered={handleMarkDelivered} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        cartItems={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <div className="max-w-md mx-auto p-6">
        <div className="mb-8 text-center space-y-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => setIsAdminPanel(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🔧 Admin Panel
              </Button>
              {currentBill && (
                <Button 
                  onClick={() => setIsBillOpen(true)}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  📄 View Current Bill
                </Button>
              )}
            </div>
          </div>
        </div>

        <FoodCounter
          title="Juices & Beverages"
          items={menuData.juices}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-orange-500 to-red-500"
          icon="🥤"
        />

        <FoodCounter
          title="Dosa & Traditional"
          items={menuData.dosa}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          icon="🥞"
        />

        <FoodCounter
          title="Veg Chinese & Parotta"
          items={menuData.vegChinese}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-red-500 to-pink-600"
          icon="🥢"
        />

        <FoodCounter
          title="Non-Veg Chinese & Kothu"
          items={menuData.nonVegChinese}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-purple-500 to-indigo-600"
          icon="🍗"
        />

        <FoodCounter
          title="Biryani Specials"
          items={menuData.biryani}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          icon="🍛"
        />

        <FoodCounter
          title="Fried Chicken & Burgers"
          items={menuData.friedChicken}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-br from-blue-500 to-cyan-600"
          icon="🍔"
        />
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={getCartItemsArray()}
        onCheckout={handleCheckout}
      />

      {currentBill && (
        <Bill
          isOpen={isBillOpen}
          onClose={() => setIsBillOpen(false)}
          orderId={currentBill.orderId}
          items={currentBill.items}
          total={currentBill.total}
          timestamp={currentBill.timestamp}
          status={currentBill.status}
        />
      )}
    </div>
  );
};

export default Index;

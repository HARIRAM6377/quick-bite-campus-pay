
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
      <div className="min-h-screen bg-gray-50">
        <Header cartItems={0} onCartClick={() => {}} isAdmin={true} />
        <div className="p-4">
          <Button 
            onClick={() => setIsAdminPanel(false)}
            className="mb-4 bg-blue-500 hover:bg-blue-600"
          >
            Switch to Student Panel
          </Button>
        </div>
        <AdminPanel orders={orders} onMarkDelivered={handleMarkDelivered} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItems={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <div className="max-w-md mx-auto p-4">
        <div className="mb-6 text-center">
          <Button 
            onClick={() => setIsAdminPanel(true)}
            className="bg-purple-500 hover:bg-purple-600 mr-2"
          >
            Admin Panel
          </Button>
          {currentBill && (
            <Button 
              onClick={() => setIsBillOpen(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              View Bill
            </Button>
          )}
        </div>

        <FoodCounter
          title="🥤 Juices & Beverages"
          items={menuData.juices}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-orange-400 to-orange-500"
        />

        <FoodCounter
          title="🥞 Dosa & Traditional"
          items={menuData.dosa}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-green-400 to-green-500"
        />

        <FoodCounter
          title="🥢 Veg Chinese & Parotta"
          items={menuData.vegChinese}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-red-400 to-red-500"
        />

        <FoodCounter
          title="🍗 Non-Veg Chinese & Kothu"
          items={menuData.nonVegChinese}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-purple-400 to-purple-500"
        />

        <FoodCounter
          title="🍛 Biryani Specials"
          items={menuData.biryani}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-yellow-400 to-yellow-500"
        />

        <FoodCounter
          title="🍔 Fried Chicken & Burgers"
          items={menuData.friedChicken}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          cartItems={cartItems}
          color="bg-gradient-to-r from-blue-400 to-blue-500"
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

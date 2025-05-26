
import React from 'react';
import { Check, Clock, User, Package } from 'lucide-react';

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

interface AdminPanelProps {
  orders: Order[];
  onMarkDelivered: (orderId: string) => void;
}

const AdminPanel = ({ orders, onMarkDelivered }: AdminPanelProps) => {
  const activeOrders = orders.filter(order => order.status !== 'delivered');
  
  const statusColors = {
    preparing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ready: 'bg-blue-100 text-blue-800 border-blue-200',
    delivered: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-xl">
            <h1 className="text-2xl font-bold flex items-center">
              <Package className="mr-3" size={24} />
              Order Management
            </h1>
            <p className="text-purple-100 mt-1">Manage canteen orders and deliveries</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <Clock className="text-yellow-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-yellow-600">Preparing</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {orders.filter(o => o.status === 'preparing').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Package className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-blue-600">Ready</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {orders.filter(o => o.status === 'ready').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Check className="text-green-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-green-600">Delivered</p>
                    <p className="text-2xl font-bold text-green-800">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Package size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 text-lg">No active orders</p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <User className="text-gray-600 mr-2" size={20} />
                      <div>
                        <h3 className="font-bold text-lg">{order.studentName}</h3>
                        <p className="text-gray-600 text-sm">Order #{order.id}</p>
                        <p className="text-gray-500 text-xs">{order.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.status]}`}>
                        {order.status === 'preparing' ? 'Preparing' : 'Ready'}
                      </span>
                      <p className="text-xl font-bold text-green-600 mt-2">₹{order.total}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">Order Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => onMarkDelivered(order.id)}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <Check className="mr-2" size={16} />
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

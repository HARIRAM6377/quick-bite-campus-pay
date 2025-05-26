
import React from 'react';
import { X, Download, Clock, Receipt, CheckCircle, AlertCircle } from 'lucide-react';

interface BillItem {
  name: string;
  quantity: number;
  price: number;
}

interface BillProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  items: BillItem[];
  total: number;
  timestamp: string;
  status: 'preparing' | 'ready' | 'delivered';
}

const Bill = ({ isOpen, onClose, orderId, items, total, timestamp, status }: BillProps) => {
  if (!isOpen) return null;

  const statusConfig = {
    preparing: {
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      icon: Clock,
      text: 'Preparing Your Order',
      description: 'Our chefs are working on your delicious meal'
    },
    ready: {
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: AlertCircle,
      text: 'Ready for Pickup',
      description: 'Your order is ready! Please collect from counter'
    },
    delivered: {
      color: 'bg-gradient-to-r from-emerald-500 to-green-600',
      icon: CheckCircle,
      text: 'Order Delivered',
      description: 'Thank you for your order! Hope you enjoyed your meal'
    }
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl">
                <Receipt size={24} />
              </div>
              <h2 className="text-2xl font-bold">Digital Receipt</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">College Canteen</h3>
            <div className="bg-gray-100 rounded-xl p-4 mb-4">
              <p className="text-gray-600 font-medium">Order ID: <span className="text-gray-800 font-bold">{orderId}</span></p>
              <p className="text-gray-600 text-sm">{timestamp}</p>
            </div>
          </div>

          <div className={`${currentStatus.color} text-white p-4 rounded-2xl mb-8 shadow-lg`}>
            <div className="flex items-center justify-center space-x-3">
              <StatusIcon size={24} />
              <div className="text-center">
                <div className="font-bold text-lg">{currentStatus.text}</div>
                <div className="text-sm opacity-90">{currentStatus.description}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Order Details</h4>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                <div>
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-600 ml-2">× {item.quantity}</span>
                </div>
                <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-6 border border-emerald-200">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
              <span className="text-3xl font-bold text-emerald-600">₹{total}</span>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <div className="text-center text-amber-800">
              <p className="font-semibold mb-1">⚠️ Security Notice</p>
              <p className="text-sm">This digital receipt cannot be screenshot or shared</p>
              <p className="text-sm">Receipt will be automatically removed after delivery</p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2">
            <Download size={20} />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;

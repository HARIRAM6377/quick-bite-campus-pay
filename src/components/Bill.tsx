
import React from 'react';
import { X, Download, Clock } from 'lucide-react';

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

  const statusColors = {
    preparing: 'bg-yellow-500',
    ready: 'bg-blue-500',
    delivered: 'bg-green-500'
  };

  const statusTexts = {
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    delivered: 'Delivered'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Digital Bill</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">College Canteen</h3>
            <p className="text-gray-600">Order ID: {orderId}</p>
            <p className="text-gray-600 text-sm">{timestamp}</p>
          </div>

          <div className={`${statusColors[status]} text-white p-3 rounded-lg mb-6 flex items-center justify-center`}>
            <Clock className="mr-2" size={16} />
            <span className="font-semibold">{statusTexts[status]}</span>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">× {item.quantity}</span>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-xl font-bold mb-6">
            <span>Total:</span>
            <span className="text-green-600">₹{total}</span>
          </div>
          
          <div className="text-center text-gray-500 text-sm mb-4">
            <p>⚠️ This bill cannot be screenshot</p>
            <p>Bill will disappear after delivery</p>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Download className="mr-2" size={16} />
            Download Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;


import React from 'react';
import { X, Download, Clock, Receipt, CheckCircle, AlertCircle, QrCode } from 'lucide-react';

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

  // Generate QR code data URL for payment
  const generateQRCode = (amount: number) => {
    // Simple QR code simulation - in real app, you'd use a proper QR library
    const qrData = `upi://pay?pa=canteen@sathyabama&pn=Sathyabama Canteen&am=${amount}&cu=INR&tn=Order ${orderId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-sm max-h-[95vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-lg">
                <Receipt size={20} />
              </div>
              <h2 className="text-lg font-bold">Digital Receipt</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">College Canteen</h3>
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-gray-600 text-sm font-medium">Order ID: <span className="text-gray-800 font-bold">{orderId}</span></p>
              <p className="text-gray-600 text-xs">{timestamp}</p>
            </div>
          </div>

          <div className={`${currentStatus.color} text-white p-3 rounded-xl mb-4 shadow-lg`}>
            <div className="flex items-center justify-center space-x-2">
              <StatusIcon size={20} />
              <div className="text-center">
                <div className="font-bold text-sm">{currentStatus.text}</div>
                <div className="text-xs opacity-90">{currentStatus.description}</div>
              </div>
            </div>
          </div>

          {/* Payment QR Code Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <QrCode className="text-blue-600" size={20} />
                <h4 className="font-bold text-blue-800">Payment QR Code</h4>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-inner border-2 border-dashed border-blue-300">
                <img 
                  src={generateQRCode(total)} 
                  alt="Payment QR Code" 
                  className="w-32 h-32 mx-auto"
                />
                <p className="text-xs text-gray-600 mt-2">Scan to pay ₹{total}</p>
              </div>
              <p className="text-xs text-blue-700 mt-2 font-medium">
                Use any UPI app to scan and pay
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-gray-800 mb-3 text-sm">Order Details</h4>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-800 text-sm block truncate">{item.name}</span>
                  <span className="text-gray-600 text-xs">× {item.quantity}</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm ml-2">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-4 border border-emerald-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">₹{total}</span>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <div className="text-center text-amber-800">
              <p className="font-semibold text-xs mb-1">⚠️ Security Notice</p>
              <p className="text-xs">This receipt is digitally protected</p>
              <p className="text-xs">Auto-removes after delivery</p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2">
            <Download size={16} />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;

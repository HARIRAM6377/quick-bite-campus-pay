
export interface FoodItem {
  id: string;
  name: string;
  price: number;
}

export const menuData = {
  juices: [
    { id: 'j1', name: 'Musk Melon Juice', price: 35 },
    { id: 'j2', name: 'Watermelon Juice', price: 30 },
    { id: 'j3', name: 'Rose Milk', price: 25 },
    { id: 'j4', name: 'Lassi', price: 40 },
    { id: 'j5', name: 'Lime Soda', price: 20 }
  ],
  dosa: [
    { id: 'd1', name: 'Masala Dosa', price: 45 },
    { id: 'd2', name: 'Plain Dosa', price: 35 },
    { id: 'd3', name: 'Rava Dosa', price: 50 },
    { id: 'd4', name: 'Poori (2 pcs)', price: 30 },
    { id: 'd5', name: 'Chole Bhature', price: 55 }
  ],
  vegChinese: [
    { id: 'vc1', name: 'Veg Fried Rice', price: 60 },
    { id: 'vc2', name: 'Veg Noodles', price: 65 },
    { id: 'vc3', name: 'Veg Manchurian', price: 70 },
    { id: 'vc4', name: 'Parotta (2 pcs)', price: 25 },
    { id: 'vc5', name: 'Gobi 65', price: 75 }
  ],
  nonVegChinese: [
    { id: 'nvc1', name: 'Chicken Fried Rice', price: 85 },
    { id: 'nvc2', name: 'Chicken Noodles', price: 90 },
    { id: 'nvc3', name: 'Chicken 65', price: 95 },
    { id: 'nvc4', name: 'Kothu Parotta', price: 80 },
    { id: 'nvc5', name: 'Egg Fried Rice', price: 70 }
  ],
  biryani: [
    { id: 'b1', name: 'Chicken Biryani', price: 120 },
    { id: 'b2', name: 'Mutton Biryani', price: 150 },
    { id: 'b3', name: 'Veg Biryani', price: 80 },
    { id: 'b4', name: 'Egg Biryani', price: 90 },
    { id: 'b5', name: 'Fish Biryani', price: 130 }
  ],
  friedChicken: [
    { id: 'fc1', name: 'Fried Chicken (4 pcs)', price: 100 },
    { id: 'fc2', name: 'Chicken Burger', price: 85 },
    { id: 'fc3', name: 'Veg Burger', price: 60 },
    { id: 'fc4', name: 'Chicken Wings (6 pcs)', price: 110 },
    { id: 'fc5', name: 'Fish Fingers', price: 95 }
  ]
};

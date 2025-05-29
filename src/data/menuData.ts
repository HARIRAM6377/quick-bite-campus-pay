
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export const menuData = {
  juices: [
    { id: 'j1', name: 'Musk Melon Juice', price: 35, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center' },
    { id: 'j2', name: 'Watermelon Juice', price: 30, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop&crop=center' },
    { id: 'j3', name: 'Rose Milk', price: 25, image: 'https://images.unsplash.com/photo-1571167797875-1e7eb56a5cd3?w=300&h=300&fit=crop&crop=center' },
    { id: 'j4', name: 'Lassi', price: 40, image: 'https://images.unsplash.com/photo-1571167797875-1e7eb56a5cd3?w=300&h=300&fit=crop&crop=center' },
    { id: 'j5', name: 'Lime Soda', price: 20, image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=300&h=300&fit=crop&crop=center' }
  ],
  dosa: [
    { id: 'd1', name: 'Masala Dosa', price: 45, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop&crop=center' },
    { id: 'd2', name: 'Plain Dosa', price: 35, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=300&fit=crop&crop=center' },
    { id: 'd3', name: 'Rava Dosa', price: 50, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop&crop=center' },
    { id: 'd4', name: 'Poori (2 pcs)', price: 30, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop&crop=center' },
    { id: 'd5', name: 'Chole Bhature', price: 55, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop&crop=center' }
  ],
  vegChinese: [
    { id: 'vc1', name: 'Veg Fried Rice', price: 60, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=300&fit=crop&crop=center' },
    { id: 'vc2', name: 'Veg Noodles', price: 65, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop&crop=center' },
    { id: 'vc3', name: 'Veg Manchurian', price: 70, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=300&fit=crop&crop=center' },
    { id: 'vc4', name: 'Parotta (2 pcs)', price: 25, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&crop=center' },
    { id: 'vc5', name: 'Gobi 65', price: 75, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop&crop=center' }
  ],
  nonVegChinese: [
    { id: 'nvc1', name: 'Chicken Fried Rice', price: 85, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop&crop=center' },
    { id: 'nvc2', name: 'Chicken Noodles', price: 90, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop&crop=center' },
    { id: 'nvc3', name: 'Chicken 65', price: 95, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=300&fit=crop&crop=center' },
    { id: 'nvc4', name: 'Kothu Parotta', price: 80, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=300&fit=crop&crop=center' },
    { id: 'nvc5', name: 'Egg Fried Rice', price: 70, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop&crop=center' }
  ],
  biryani: [
    { id: 'b1', name: 'Chicken Biryani', price: 120, image: 'https://images.unsplash.com/photo-1563379091339-03246963d49a?w=300&h=300&fit=crop&crop=center' },
    { id: 'b2', name: 'Mutton Biryani', price: 150, image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=300&h=300&fit=crop&crop=center' },
    { id: 'b3', name: 'Veg Biryani', price: 80, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop&crop=center' },
    { id: 'b4', name: 'Egg Biryani', price: 90, image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=300&h=300&fit=crop&crop=center' },
    { id: 'b5', name: 'Fish Biryani', price: 130, image: 'https://images.unsplash.com/photo-1574653339688-2cb730d800c4?w=300&h=300&fit=crop&crop=center' }
  ],
  friedChicken: [
    { id: 'fc1', name: 'Fried Chicken (4 pcs)', price: 100, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=300&fit=crop&crop=center' },
    { id: 'fc2', name: 'Chicken Burger', price: 85, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center' },
    { id: 'fc3', name: 'Veg Burger', price: 60, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center' },
    { id: 'fc4', name: 'Chicken Wings (6 pcs)', price: 110, image: 'https://images.unsplash.com/photo-1527477396-1461ce73cad9?w=300&h=300&fit=crop&crop=center' },
    { id: 'fc5', name: 'Fish Fingers', price: 95, image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=300&fit=crop&crop=center' }
  ]
};

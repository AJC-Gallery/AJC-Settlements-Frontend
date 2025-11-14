// src/data/dashboardContent.ts
export interface Settlement {
  name: string;
  location: string;
  image: string;
  occupants: number;
}

export interface Occupant {
  name: string;
  house: string;
  apartment: string;
  rent: number;
  image: string;
  paymentStatus: "healthy" | "faulty" | "critical";
}

export interface Revenue {
  month: string;
  amountCollected: number;
  totalExpected: number;
}

// Settlements data
export const settlements: Settlement[] = [
  { name: "Sunset Villas", location: "Lagos", image: "https://www.villaafrika.com/wp-content/uploads/2019/11/flats-nigeria.jpg", occupants: 5 },
  { name: "Green Acres", location: "Abuja", image: "https://www.villaafrika.com/wp-content/uploads/2019/11/detached-house-nigeria.jpg", occupants: 3 },
  { name: "Palm Residency", location: "Port Harcourt", image: "https://nigerianhouseplans.com/wp-content/uploads/2023/10/3101-v2-copy.jpg", occupants: 6 },
  { name: "Ocean View", location: "Calabar", image: "https://www.villaafrika.com/wp-content/uploads/2019/11/homes-in-nigeria.jpg", occupants: 4 },
  { name: "Maple Heights", location: "Kaduna", image: "https://www.tolet.com.ng/blog/wp-content/uploads/2017/04/duplex.jpg", occupants: 8 },
  { name: "Sunrise Court", location: "Ibadan", image: "https://www.aljazeera.com/wp-content/uploads/2020/06/d391b019d85048829a2b76033853defc_18.jpeg?quality=80&quality=80", occupants: 2 },
  { name: "Riverfront Estate", location: "Enugu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIW-spu0EMZf93KVvUZmkDwYcCsugZhnb2q224CA3DPIKjU7Cwth0MoSsXeaAAhehNUk&usqp=CAU", occupants: 7 },
  { name: "Crystal Park", location: "Jos", image: "https://images.nigeriapropertycentre.com/properties/images/3167691/0690c6a867807b-3-bedroom-eco-bungalow-bq-n3m-deposit-detached-bungalows-for-sale-lekki-ibeju-lagos.jpg", occupants: 3 },
  { name: "Hilltop Villas", location: "Uyo", image: "https://peteroz.com.ng/wp-content/uploads/2022/11/update.png", occupants: 5 },
  { name: "Skyline Apartments", location: "Benin City", image: "https://nigerianhouseplans.com/wp-content/uploads/2018/02/nigerian-house-plans-5021.3.jpg", occupants: 4 },
];
// Occupants data (Nigerian Names + African Avatars)
export const occupants: Occupant[] = [
  { 
    name: "Emeka Okafor", 
    house: "Sunset Villas", 
    apartment: "1A", 
    rent: 50000, 
    image: "https://randomuser.me/api/portraits/men/76.jpg", 
    paymentStatus: "healthy" 
  },
  { 
    name: "Aisha Bello", 
    house: "Green Acres", 
    apartment: "2B", 
    rent: 35000, 
    image: "https://randomuser.me/api/portraits/women/65.jpg", 
    paymentStatus: "faulty" 
  },
  { 
    name: "Tunde Balogun", 
    house: "Palm Residency", 
    apartment: "3C", 
    rent: 45000, 
    image: "https://randomuser.me/api/portraits/men/72.jpg", 
    paymentStatus: "critical" 
  },
  { 
    name: "Chioma Nwosu", 
    house: "Ocean View", 
    apartment: "2D", 
    rent: 30000, 
    image: "https://randomuser.me/api/portraits/women/67.jpg", 
    paymentStatus: "healthy" 
  },
  { 
    name: "Kunle Adeyemi", 
    house: "Maple Heights", 
    apartment: "1B", 
    rent: 40000, 
    image: "https://randomuser.me/api/portraits/men/75.jpg", 
    paymentStatus: "healthy" 
  },
  { 
    name: "Fatima Ibrahim", 
    house: "Sunrise Court", 
    apartment: "3A", 
    rent: 25000, 
    image: "https://randomuser.me/api/portraits/women/74.jpg", 
    paymentStatus: "faulty" 
  },
  { 
    name: "Ifeanyi Obinna", 
    house: "Riverfront Estate", 
    apartment: "4B", 
    rent: 55000, 
    image: "https://randomuser.me/api/portraits/men/78.jpg", 
    paymentStatus: "healthy" 
  },
  { 
    name: "Zainab Abdullahi", 
    house: "Crystal Park", 
    apartment: "2C", 
    rent: 30000, 
    image: "https://randomuser.me/api/portraits/women/71.jpg", 
    paymentStatus: "critical" 
  },
  { 
    name: "Seyi Ogunleye", 
    house: "Hilltop Villas", 
    apartment: "1C", 
    rent: 45000, 
    image: "https://randomuser.me/api/portraits/men/79.jpg", 
    paymentStatus: "healthy" 
  },
  { 
    name: "Amara Chukwu", 
    house: "Skyline Apartments", 
    apartment: "3D", 
    rent: 35000, 
    image: "https://randomuser.me/api/portraits/women/69.jpg", 
    paymentStatus: "healthy" 
  }
];


// Revenue data
export const revenue: Revenue[] = [
  { month: "Jan", amountCollected: 350000, totalExpected: 400000 },
  { month: "Feb", amountCollected: 380000, totalExpected: 400000 },
  { month: "Mar", amountCollected: 390000, totalExpected: 400000 },
  { month: "Apr", amountCollected: 400000, totalExpected: 400000 },
  { month: "May", amountCollected: 370000, totalExpected: 400000 },
  { month: "Jun", amountCollected: 420000, totalExpected: 400000 },
  { month: "Jul", amountCollected: 410000, totalExpected: 400000 },
  { month: "Aug", amountCollected: 380000, totalExpected: 400000 },
  { month: "Sep", amountCollected: 395000, totalExpected: 400000 },
  { month: "Oct", amountCollected: 400000, totalExpected: 400000 },
];

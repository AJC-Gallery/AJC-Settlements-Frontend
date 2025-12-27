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
  { name: "Sunset Villas", location: "Lagos", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800", occupants: 5 },
  { name: "Green Acres", location: "Abuja", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800", occupants: 3 },
  { name: "Palm Residency", location: "Port Harcourt", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", occupants: 6 },
  { name: "Ocean View", location: "Calabar", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", occupants: 4 },
  { name: "Maple Heights", location: "Kaduna", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800", occupants: 8 },
  { name: "Sunrise Court", location: "Ibadan", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", occupants: 2 },
  { name: "Riverfront Estate", location: "Enugu", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", occupants: 7 },
  { name: "Crystal Park", location: "Jos", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800", occupants: 3 },
  { name: "Hilltop Villas", location: "Uyo", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", occupants: 5 },
  { name: "Skyline Apartments", location: "Benin City", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", occupants: 4 },
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
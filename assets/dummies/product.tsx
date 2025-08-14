export const dummyProducts = [
  {
    productID: 11111111,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
  {
    productID: 22222222,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
  {
    productID: 33333333,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
  {
    productID: 44444444,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
  {
    productID: 55555555,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
  {
    productID: 66666666,
    productName: "Canned Peaches",
    hasFlavors: true,
    flavors: ["flavor1", "flavor2", "flavor3"],
    description: "A delicious can of peaches that can last a long time.",
    imagePath: "/assets/dummies/canned_peaches.jpeg",
    price: 70.0,
  },
];

export const dummySearches = ["Peaches", "Beans", "Item", "ItemzzzzZZZZzzzzz"];

export type Product = {
  id: string;
  name: string;
  image: string;
  available: boolean;
  price: number;
};

export type UnifiedInventoryItem = {
  name: string;
  price: number; // should be in hkd, $8.5 should be 8.50.
  image: string; // URL to image of product if provided.
  vmBrand: string;
  vmId: string; // Should be VM api's internal VM id, not our system's VM id.
  quantity: number; // Available inventory
  numOrdered: number; // For receiving orders from front end, indicates number of the product ordered by user.
  description: string;
  originalData: any; // original inventory data from vm api.
};

// Now every product object follows the UnifiedInventoryItem interface.
export const vendingMachineProducts: { [machineId: string]: UnifiedInventoryItem[] } = {
  "1": [
    {
      name: "Coke",
      price: 10,
      image: "https://i.postimg.cc/CLq7GtzJ/Cocacola.jpg",
      vmBrand: "BrandA",
      vmId: "1",
      quantity: 10,
      numOrdered: 0,
      description: "Classic Coca-Cola beverage.",
      originalData: {},
    },
    {
      name: "Sprite",
      price: 9,
      image: "https://i.postimg.cc/gkFSTm91/Sprite.jpg",
      vmBrand: "BrandA",
      vmId: "1",
      quantity: 2,
      numOrdered: 0,
      description: "Refreshing lemon-lime soda.",
      originalData: {},
    },
  ],
  "2": [
    {
      name: "Water",
      price: 8,
      image: "https://i.postimg.cc/3x3QzSGq/machine-product-1.jpg",
      vmBrand: "BrandB",
      vmId: "2",
      quantity: 20,
      numOrdered: 0,
      description: "Still mineral water 500 ml.",
      originalData: {},
    },
    {
      name: "Chips",
      price: 12,
      image: "https://i.postimg.cc/kXKZJDFn/potatochips.png",
      vmBrand: "BrandB",
      vmId: "2",
      quantity: 10,
      numOrdered: 0,
      description: "Crunchy potato chips.",
      originalData: {},
    },
  ],
};

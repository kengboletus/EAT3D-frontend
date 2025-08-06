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

export const vendingMachineProducts: { [machineId: string]: Product[] } = {
  "1": [
    {
      id: "1",
      name: "Coke",
      image: "https://i.postimg.cc/CLq7GtzJ/Cocacola.jpg",
      available: true,
      price: 10,
    },
    {
      id: "2",
      name: "Sprite",
      image: "https://i.postimg.cc/gkFSTm91/Sprite.jpg",
      available: false,
      price: 9,
    },
  ],
  "2": [
    {
      id: "3",
      name: "Water",
      image: "https://i.postimg.cc/3x3QzSGq/machine-product-1.jpg",
      available: true,
      price: 8,
    },
    {
      id: "4",
      name: "Chips",
      image: "https://i.postimg.cc/kXKZJDFn/potatochips.png",
      available: true,
      price: 12,
    },
  ],
};

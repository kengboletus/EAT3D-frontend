export type VendingMachine = {
  id: string;
  // name: string;
  brand: string;
  vm_location: string;
  img?: string; // Optional image property
  max_products: number;
  // status: "online" | "offline";
};

export const dummyMachines: VendingMachine[] = [
  {
    id: "1",
    brand: "Eat3D",
    vm_location: "尖沙咀柯士甸道西3號香港西九龍站售票大堂B1樓WEK VEM 4號舖",
    img: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    max_products: 5,
  },
  {
    id: "2",
    brand: "文物舘",
    vm_location: "沙田香港中文大學文物館羅桂祥閣",
    img: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    max_products: 5,
  },
  {
    id: "3",
    brand: "UST",
    vm_location: "香港科技大學香港九龍清水灣",
    img: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    max_products: 28,
  },
];
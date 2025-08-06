export type VendingMachine = {
  id: string;
  name: string;
  location: string;
  image?: string; // Optional image property
  status: "online" | "offline";
};

export const dummyMachines: VendingMachine[] = [
  {
    id: "1",
    name: "Eat3D Vending Machine",
    location: "尖沙咀柯士甸道西3號香港西九龍站售票大堂B1樓WEK VEM 4號舖",
    image: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    status: "online",
  },
  {
    id: "2",
    name: "文物舘 Vending Machine",
    location: "沙田香港中文大學文物館羅桂祥閣",
    image: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    status: "offline",
  },
  {
    id: "3",
    name: "UST Vending Machine",
    location: "香港科技大學香港九龍清水灣",
    image: "https://i.postimg.cc/bJvScbRC/Vending-Machine.jpg",
    status: "online",
  },
];

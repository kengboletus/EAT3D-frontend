/**
 * Global Product interface used by UI components and dummy data.
 *
 * Note: This is declared in a .d.ts to be available globally without imports
 * where TypeScript is configured to include this folder.
 */
interface Product {
  productID: number;
  productName: string;
  hasFlavors: boolean;
  flavors: string[];
  description: string;
  imagePath: string;
  price: number;
}

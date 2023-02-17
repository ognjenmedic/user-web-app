export interface Product {
  sku: number;
  productName: string;
  imageUrl: string;
  description: string;
  unitPrice: number;
  categoryId: ProductCategory;
  category: string;
  unitsInStock: number;
}

export enum ProductCategory {
  WOMEN = 1,
  MEN = 2,
  KIDS = 3,
}

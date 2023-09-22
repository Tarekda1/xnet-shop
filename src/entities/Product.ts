export interface PostedProduct {
  _id?: string;
  name: string;
  barcode: string;
  description: string;
  price: number;
  image?: File[];
  category?: any;
  supplier?: any;
}

export interface Product {
  _id?: string;
  name: string;
  barcode: string;
  description: string;
  price: number;
  image?: string;
  category?: any;
  supplier?: any;
}

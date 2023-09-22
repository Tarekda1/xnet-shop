export interface InventoryItem {
  _id?: string;
  quantity?: number;
  status?: number;
  sellingPrice?: number;
  product?: {
    _id: string;
    name: string;
    barcode: string;
    description: string;
    price: number;
    image?: string;
    category?: any;
    supplier?: any;
  };
}

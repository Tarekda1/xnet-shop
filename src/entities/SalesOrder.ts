export interface SalesOrder {
  _id?: string;
  orderId: number;
  customer?: number;
  status?: string;
  items: [SalesOrderItem];
  totalProfit: number;
}

export interface SalesOrderItem {
  product: string;
  quantity: number;
  salesPrice: number;
}

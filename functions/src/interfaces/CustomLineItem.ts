export interface CustomLineItem {
  id: string;
  object: 'line_item';
  amount: number;
  currency: string;
  description: string;
  pricing: {
    price_details: {
      price: string;
      product: string;
    };
  };
  quantity: number;
  [key: string]: any; // permite outros campos não tipados
}
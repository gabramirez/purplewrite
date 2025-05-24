export interface CustomInvoiceParent {
  type: string;
  quote_details: any
  subscription_details: {
    subscription: string;
    metadata: {
      userUid?: string;
      [key: string]: any;
    };
  };
}


interface IProduct {
    productName: string;
    unitPrice: string;
    quantity: number;
    taxAmount: string;
    subTotal: string;
}

interface ISale {
    saleTime: string;
    customer: string;
    cashier: string;
    saleTotal: string;
    status: string;
    products: IProduct[];
}
export interface ISalesHistoryTableProps {
    saleHistory: ISale[];
}

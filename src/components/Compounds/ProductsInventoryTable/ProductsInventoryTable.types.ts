export interface IOutlet {
    outlet: string;
    supplyPrice: string;
    sellingPrice: string;
    stockAvailable: string;
}

export interface IProduct {
    productName: string;
    description: string;
    category: string;
    brand: string;
    availableStock: string;
    sellingPrice: string;
    active: boolean;
}

export interface IProductsInventoryTableProps {
    products: IProduct[];
}

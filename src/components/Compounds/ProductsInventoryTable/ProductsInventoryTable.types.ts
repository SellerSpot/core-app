interface IOutlet {
    outlet: string;
    supplyPrice: string;
    sellingPrice: string;
    stockAvailable: string;
}

interface IProduct {
    productName: string;
    description: string;
    category: string;
    brand: string;
    availableStock: string;
    sellingPrice: string;
    active: boolean;
    outlets: IOutlet[];
}

export interface IProductsInventoryTableProps {
    products: IProduct[];
}

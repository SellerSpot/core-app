export interface IProduct {
    productName: string;
    description: string;
    category: string;
    brand: string;
    availableStock: string;
    sellingPrice: string;
    active: boolean;
}

export interface IProductsCatalogTableProps {
    products: IProduct[];
}

interface IInventoryDataDynamic {
    id?: string;
    outlet: string;
    stock: number;
    isActive: boolean;
    isTrack: boolean;
    markup: number;
    mrp: number;
    landingCost: number;
    sellingPrice: number;
    taxSetting: string;
}

export interface IProductData {
    id: string;
    name: string;
    barcode?: string;
    description?: string;
    stockUnit?: string;
    brand?: string;
    category?: string;
}

export type IInventoryData = IProductData & {
    configurations: IInventoryDataDynamic[];
};

interface ICategorySchema {
    _id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}

interface IBrandSchema {
    _id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}

interface IStockUnitSchema {
    _id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}

interface ITaxBracketSchema {
    _id?: string;
    name: string;
    taxPercent: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}

export interface IProductSchema {
    _id?: string;
    name: string;
    category: ICategorySchema | string;
    brand: IBrandSchema | string;
    gtinNumber?: string;
    mrpPrice?: number;
    landingPrice?: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: IStockUnitSchema | string;
    };
    profitPercent?: number;
    taxBracket: ITaxBracketSchema[] | string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}

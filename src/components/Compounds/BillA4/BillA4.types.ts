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

interface IProductSchema {
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

interface INewSaleCart {
    products: IProductSchema[];
    /**
     * Holds the cart related information for the products in the same index position
     */
    productCartInformation: {
        itemName: string;
        itemPrice: number;
        itemQuantity: number;
        itemSubTotalBeforeDiscounts: number;
        itemDiscountPercent: number;
        itemDiscountValue: number;
        totalDiscountValue: number;
        itemSubTotalAfterDiscounts: number;
        taxes: {
            taxBracketName: string;
            taxPercent: number;
            // computed tax amount for the current item
            taxValue: number;
        }[];
        // total tax for single instance of the item
        taxSum: number;
        totalTax: number;
        itemTotal: number;
        grandTotal: number;
    }[];
    totals: {
        grandTotal: number;
        grandTotalTax: number;
        grandTotalDiscount: number;
    };
}

export interface IBillA4Props {
    billReference: React.RefObject<HTMLDivElement>;
    saleData: INewSaleCart;
    paymentInformation: {
        balance: number;
        paid: number;
    };
}

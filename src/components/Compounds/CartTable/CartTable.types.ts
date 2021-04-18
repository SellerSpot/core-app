export interface ITaxBracket {
    bracketName: string;
    bracketRate: number;
}

export interface ICartProductsData {
    quantity: number;
    stockUnit: string;
    productName: string;
    unitPrice: number;
    subTotal: number;
    discountPercent: number;
    taxBrackets: ITaxBracket[];
}

export type TCartTableLocalStore = {
    productName: string;
    setProductName: (data: string) => void;
};

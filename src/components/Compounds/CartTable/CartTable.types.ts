export interface ICartProductsData {
    quantity: number;
    stockUnit: string;
    productName: string;
    unitPrice: number;
    subTotal: number;
    discountPercent: number;
    taxBrackets: {
        bracketName: string;
        bracketRate: number;
    }[];
}

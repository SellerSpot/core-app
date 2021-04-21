import create from 'zustand';

export class CartTableService {
    // handles changing the name of the product
    static handleProductNameChange = (
        newValue: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
    ): void => {
        setValue(newValue);
    };
    // handles changing the quantity of the product
    static handleProductQuantityChange = (
        newValue: string,
        setValue: React.Dispatch<React.SetStateAction<number>>,
    ): void => {
        setValue(+newValue);
    };
    // handles changing the unit price of the product
    static handleProductUnitPriceChange = (
        newValue: string,
        setValue: React.Dispatch<React.SetStateAction<number>>,
    ): void => {
        setValue(+newValue);
    };
    // handles changing the discount of the product
    static handleProductDiscountPercentChange = (
        newValue: number,
        setValue: React.Dispatch<React.SetStateAction<number>>,
    ): void => {
        setValue(newValue);
    };
}

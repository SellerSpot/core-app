export interface ICartTableData {
    qty: number;
    productName: string;
    subTotal: number;
}

export type TCartTableZustandStore = {
    cartProducts: ICartTableData[];
    changeProductQty: (newQty: number, index: number) => void;
};

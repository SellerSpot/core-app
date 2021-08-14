import { IInventoryData, ISaleData } from '@sellerspot/universal-types';

export interface INewSaleModals {
    checkout: boolean;
    parkedSales: boolean;
}

export interface ISearchState {
    query: string;
    searching: boolean;
    results: IInventoryData[];
}

export interface INewSaleState {
    search: ISearchState;
    saleData: ISaleData;
    modals: INewSaleModals;
}

export interface ITaxSplitUp {
    name: string;
    rate: number;
    taxableValue: number;
    taxAmount: number;
    itemsSerialNo: number[];
}

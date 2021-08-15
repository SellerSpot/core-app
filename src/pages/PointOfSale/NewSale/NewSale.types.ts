import { IBillSettings, IInventoryData, ISaleData } from '@sellerspot/universal-types';

export interface INewSaleModals {
    checkout: boolean;
    parkedSales: boolean;
}

export interface ISearchState {
    query: string;
    searching: boolean;
    results: IInventoryData[];
}

export interface INewSaleCustomer {
    isAnonymous: boolean;
    mobile: string;
    name: string;
    email: string;
    address: string;
}

export interface INewSaleState {
    search: ISearchState;
    saleData: ISaleData;
    modals: INewSaleModals;
    billSettings: IBillSettings;
    customer: INewSaleCustomer;
}

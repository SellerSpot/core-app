import { State } from '@hookstate/core';
import { ReactElement } from 'react';
import { IDimension } from '@sellerspot/universal-components';
import { EBILL_SIZES } from '@sellerspot/universal-types';

export interface IProductTax {
    taxBracketName: string;
    taxPercent: number;
    // computed tax amount for the current item
    taxValue: number;
}

export interface IBillData {
    /**
     * Holds the cart related information for the products in the same index position
     */
    productCartInformation: {
        name: string;
        price: number;
        quantity: number;
        subTotalBeforeDiscounts: number;
        discountPercent: number;
        discountValue: number;
        totalDiscountValue: number;
        subTotalAfterDiscounts: number;
        taxes: IProductTax[];
        // total tax for single instance of the item
        taxSum: number;
        totalTax: number;
        total: number; // total of the item - before applying discount - doubt
        grandTotal: number; // grand total of the item
        stockUnit: string;
    }[];
    totals: {
        grandTotal: number;
        grandTotalTax: number;
        grandTotalDiscount: number;
        grandTotalTaxPercentage: number;
    };
}

export type TBills = {
    [key in keyof typeof EBILL_SIZES]: unknown;
};

export type TBILL_SIZE_NAMES = EBILL_SIZES;

export type TBillComponentMap = {
    [key in keyof typeof EBILL_SIZES]: {
        BILL: <T>(props?: unknown | { state: State<T>; dimension: IDimension }) => ReactElement;
        SETTINGS: <T>(props?: unknown | { state: State<T> }) => ReactElement;
        /**
         * dimensions should be in px (approximate data is enough)
         * it helps in  billPreview holder component for better viewing experience
         */
        dimension: Partial<IDimension>;
    };
};

export type TBillDimensions = {
    [k in keyof typeof EBILL_SIZES]: Partial<IDimension>; // height is not needed, hence making it partial
};

// bill preview props
export interface IBillBaseProps<T> {
    data: IBillData;
    settings: T;
    dimension?: IDimension; // only used in BillSettings.tsx component for scaling layout
}

export type IBillBaseChildProps<T> = Omit<IBillBaseProps<T>, 'dimension'>;

import { State } from '@hookstate/core';
import { ReactElement } from 'react';
import { IDimension } from '@sellerspot/universal-components';
import { EBILL_SIZES, ISaleData } from '@sellerspot/universal-types';

export type TBills = {
    [key in keyof typeof EBILL_SIZES]: unknown;
};

export type TBILL_SIZE_NAMES = EBILL_SIZES;

export type TBillComponentMap = {
    [key in keyof typeof EBILL_SIZES]: {
        BILL: (props: IBillBaseProps<unknown>) => ReactElement;
        SETTINGS: <T>(props?: unknown | { state: State<T> }) => ReactElement;
        /**
         * dimensions should be in px (approximate data is enough)
         * it helps in  billPreview holder component for better viewing experience
         */
        dimension: Partial<IDimension>;
    };
};

export type TBillDimensions = {
    [k in EBILL_SIZES]: Partial<IDimension>; // height is not needed, hence making it partial
};

// bill preview props
export interface IBillBaseProps<T> {
    data: ISaleData;
    settings: T;
    dimension?: Partial<IDimension>; // only used in BillSettings.tsx component for scaling layout
}

export type IBillBaseChildProps<T> = Omit<IBillBaseProps<T>, 'dimension'>;

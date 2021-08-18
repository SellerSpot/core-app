import { MutableRefObject, ReactElement } from 'react';

export interface IBillHolderProps {
    /**
     * enable print
     */
    enablePrint?: boolean;
    /**
     * component to be zoomed
     */
    children?: ReactElement;
}

export interface TBillHolderRefProps {
    triggerPrint: () => Promise<boolean>;
}

export type TBillHolderRef = MutableRefObject<TBillHolderRefProps>;

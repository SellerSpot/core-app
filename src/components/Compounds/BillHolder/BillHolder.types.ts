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
    triggerPrint: () => void;
}

export type TBillHolderRef = MutableRefObject<TBillHolderRefProps>;

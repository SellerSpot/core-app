import { ReactElement } from 'react';

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

export type TBillType = '90MM' | 'A4';

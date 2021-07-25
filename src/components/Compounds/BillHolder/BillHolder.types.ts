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

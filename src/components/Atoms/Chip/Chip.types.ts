import { ReactElement } from 'react';

export interface IChipProps {
    label: string;
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default' | 'accent';
    /**
     * Leading icon for the chip
     */
    leadingIcon?: ReactElement;
}

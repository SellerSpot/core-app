import { ReactElement } from 'react';

export interface IToolTipProps {
    message: string;
    placement: 'top' | 'left' | 'right' | 'bottom';
    children: ReactElement;
}

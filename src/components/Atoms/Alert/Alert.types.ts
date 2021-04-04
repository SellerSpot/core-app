import { ReactElement } from 'react';
export interface IAlertProps {
    type: 'warning' | 'error' | 'success' | 'info';
    title?: string;
    children: ReactElement | string;
}

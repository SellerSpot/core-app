import { ReactElement } from 'react';

export interface ILoaderProps {
    children: ReactElement;
    isLoading: boolean;
    skeleton: ReactElement;
}

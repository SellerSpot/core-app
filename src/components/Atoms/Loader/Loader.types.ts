import { ReactElement } from 'react';

export interface ILoaderProps {
    isLoading: boolean;
    loaderType: 'spinner' | 'shimmer';
    skeleton?: ReactElement;
    children?: ReactElement | ReactElement[] | string | number;
    message?: string;
}

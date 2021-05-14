import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';

interface IGlobalLoaderProps {
    children?: ReactElement | ReactElement[] | string | number;
}

export const GlobalLoader = (props: IGlobalLoaderProps): ReactElement => {
    // selectors
    const { isLoading } = useSelector(appSelector);

    // props
    const { children } = props;

    return (
        <Loader isLoading={isLoading} loaderType="spinner">
            {children}
        </Loader>
    );
};

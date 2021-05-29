import { Notify } from '@sellerspot/universal-components';
import { RouteWatcher } from 'components/Atoms/RouteWatcher/RouteWatcher';
import React, { ReactElement } from 'react';
import { TReactChildren } from 'typings/common.types';

interface ICommonProviderProps {
    children?: TReactChildren;
}

export const CommonProvider = (props: ICommonProviderProps): ReactElement => {
    const { children } = props;
    return (
        <>
            <RouteWatcher />
            {children}
            <Notify />
        </>
    );
};

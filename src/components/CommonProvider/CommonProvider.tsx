import { Notify } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';

export const CommonProvider = (props: { children: ReactElement }): ReactElement => {
    const { children } = props;
    return (
        <>
            {children}
            <Notify />
        </>
    );
};

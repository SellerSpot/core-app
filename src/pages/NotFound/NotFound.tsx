import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { showNotify } from '@sellerspot/universal-components';

import { ROUTES } from 'config/routes';

export interface INotFoundProps {
    redirectTo?: string;
}

export const NotFound = (props: INotFoundProps): ReactElement => {
    // props
    const { redirectTo } = props;

    // helpers
    const history = useHistory();

    // handlers
    const pushToHome = () => {
        const routeToRedirect = redirectTo ?? ROUTES.HOME;
        history.push(routeToRedirect);
    };

    // effects
    useEffect(() => {
        showNotify('Oops! URL you are looking for is invalid!', {
            autoHideDuration: 2500,
        });
        pushToHome();
    }, []);

    return <></>;
};

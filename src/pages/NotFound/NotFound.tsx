import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, showNotify } from '@sellerspot/universal-components';

import { ROUTES } from 'config/routes';

import styles from './NotFound.module.scss';

export const NotFound = (): ReactElement => {
    const history = useHistory();

    // handlers
    const pushToHome = () => history.push(ROUTES.HOME);

    // effects
    useEffect(() => {
        showNotify('Oops! URL you are looking for is  invalid!', {
            autoHideDuration: 1500,
            onClose: pushToHome, // 2nd case
        });
    }, []);

    return (
        <div className={styles.notFoundWrapper}>
            <div>Oops! URL you are looking for is invalid!</div>
            <Button label={'Go to Home'} onClick={pushToHome}></Button>
        </div>
    );
};

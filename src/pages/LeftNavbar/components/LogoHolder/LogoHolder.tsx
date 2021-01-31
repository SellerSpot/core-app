import { ROUTES } from 'config/routes';
import { LogoImage } from 'images/images';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './logoholder.module.scss';

export const LogoHolder = (): ReactElement => {
    const history = useHistory();
    return (
        <div className={styles.logoHolderWrapper}>
            <div className={styles.logoWrapper} onClick={() => history.push(ROUTES.HOME)}>
                <img className={styles.logoImage} src={LogoImage} />
                <div className={styles.logoTitle}>SellerSpot</div>
            </div>
        </div>
    );
};

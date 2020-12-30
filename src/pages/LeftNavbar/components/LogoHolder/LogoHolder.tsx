import { LogoImage } from 'images/images';
import React, { ReactElement } from 'react';
import { getLogoHolderStyles } from './logoholder.styles';

export const LogoHolder = (): ReactElement => {
    const styles = getLogoHolderStyles();
    return (
        <div className={styles.logoHolderWrapper}>
            <div className={styles.logoWrapper}>
                <img className={styles.logoImage} src={LogoImage} />
                <div className={styles.logoTitle}>SellerSpot</div>
            </div>
        </div>
    );
};

import React, { ReactElement } from 'react';
import styles from './auth.module.css';
import promoImage from 'images/auth-promo.png';
import logoImage from 'images/logo.png';

export const Auth = (): ReactElement => {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.promotionHolder}>
                <img className={styles.promotionImage} src={promoImage} alt="Promotion" />
                <div className={styles.logoHolder}>
                    <img className={styles.logoImage} src={logoImage} alt="logo" />
                    <div className={styles.logoTitle}>SellerSpot</div>
                </div>
            </div>
            <div className={styles.mainContentHOlderI}>asfd</div>
        </div>
    );
};

import React, { ReactElement } from 'react';
import { LogoHolder } from './components/LogoHolder/LogoHolder';
import { MenuHolder } from './components/MenuHolder/MenuHolder';
import { ProfileHolder } from './components/ProfileHolder/ProfileHolder';
import { getLeftNavBarStyles } from './leftnavbar.styles';

export const LeftNavbar = (): ReactElement => {
    const styles = getLeftNavBarStyles();
    return (
        <div className={styles.leftnavWrapper}>
            <div className={styles.logoHolder}>
                <LogoHolder />
            </div>
            <div className={styles.menuHolder}>
                <MenuHolder />
            </div>
            <div className={styles.profileHolder}>
                <ProfileHolder />
            </div>
        </div>
    );
};

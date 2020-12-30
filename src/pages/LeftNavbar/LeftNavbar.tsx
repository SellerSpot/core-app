import React, { ReactElement } from 'react';
import { getStyles } from './leftnavbar.styles';

export const LeftNavbar = (): ReactElement => {
    const styles = getStyles();
    return <div className={styles.leftnavWrapper}>LeftNav</div>;
};

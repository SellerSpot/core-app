import React, { ReactElement } from 'react';
import { getStyles } from './topnavbar.styles';

export const TopNavbar = (): ReactElement => {
    const styles = getStyles();
    return <div className={styles.topNavbarWrapper}>TopNav</div>;
};

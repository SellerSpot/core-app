import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { getHomeStyles } from './home.styles';

export const Home = (): ReactElement => {
    const styles = getHomeStyles();
    return <div className={cx(styles.homeWrapper)}>Home</div>;
};

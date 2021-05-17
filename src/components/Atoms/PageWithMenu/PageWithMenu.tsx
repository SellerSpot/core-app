import React, { ReactElement, ReactNode } from 'react';
import styles from './PageWithMenu.module.scss';

export const PageWithMenuLHS = (props: { children?: ReactElement }): ReactElement => {
    const { children } = props;
    return <div className={styles.pageWithMenuLHS}>{children}</div>;
};

export const PageWithMenuRHS = (props: { children?: ReactElement }): ReactElement => {
    const { children } = props;
    return (
        <div className={styles.pageWithMenuRHS}>
            <div className={styles.contentWrapper}>{children}</div>
        </div>
    );
};

export const PageWithMenu = (props: { children?: ReactNode }): ReactElement => {
    const { children } = props;
    return <div className={styles.pageWithMenuWrapper}>{children}</div>;
};

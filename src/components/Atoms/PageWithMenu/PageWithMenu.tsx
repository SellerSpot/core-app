import React, { ReactElement } from 'react';
import styles from './PageWithMenu.module.scss';

export const MenuWithPage = (props: { children?: [ReactElement, ReactElement] }): ReactElement => {
    const { children } = props;
    return (
        <div className={styles.pageWithMenuWrapper}>
            <div className={styles.menuHolder}>{children[0]}</div>
            <div className={styles.pageHolder}>
                <div className={styles.contentWrapper}>{children[1]}</div>
            </div>
        </div>
    );
};

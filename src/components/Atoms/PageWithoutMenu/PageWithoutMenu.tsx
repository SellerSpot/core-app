import React, { ReactElement } from 'react';
import styles from '././PageWithoutMenu.module.scss';

export const PageWithoutMenu = (props: { children?: ReactElement }): ReactElement => {
    const { children } = props;
    return (
        <div className={styles.pageWithoutMenuWrapper}>
            <div className={styles.pageHolder}>
                <div className={styles.contentWrapper}>{children}</div>
            </div>
        </div>
    );
};

import React from 'react';
import { ReactElement } from 'react';
import { IPageHeaderProps } from './PageHeader.types';
import styles from './PageHeader.module.scss';

export { IPageHeaderProps } from './PageHeader.types';

export const PageHeader = (props: IPageHeaderProps): ReactElement => {
    const { actions, actionsLHS, title } = props;
    return (
        <div className={styles.wrapper}>
            <div className={styles.titleHolder}>
                <h3>{title}</h3>
            </div>
            <div className={styles.actionsWrapper}>
                <div className={styles.actions}>{actionsLHS}</div>
                <div className={styles.actions}>{actions}</div>
            </div>
        </div>
    );
};

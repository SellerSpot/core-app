import React from 'react';
import { ReactElement } from 'react';
import styles from './PageHeader.module.scss';
import { IPageHeaderProps } from './PageHeader.types';
export { IPageHeaderProps } from './PageHeader.types';

export const PageHeader = (props: IPageHeaderProps): ReactElement => {
    const { actions, title } = props;
    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.headerActions}>{actions}</div>
        </div>
    );
};

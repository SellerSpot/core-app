import React from 'react';
import { ReactElement } from 'react';
import { IPageHeaderProps } from './PageHeader.types';
import styles from './PageHeader.module.scss';

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

import React, { ReactElement } from 'react';
import { IBillA4ChildProps } from '../../BillA4.types';
import styles from './BillA4Footer.module.scss';

export const BillA4Footer = (props: IBillA4ChildProps): ReactElement => {
    const { settings } = props;
    const { show, value } = settings.footerMessage;
    return (
        <>
            {show && (
                <div className={styles.wrapper}>
                    <p>{value}</p>
                </div>
            )}
        </>
    );
};

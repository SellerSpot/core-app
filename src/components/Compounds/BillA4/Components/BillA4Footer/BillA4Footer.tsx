import React, { ReactElement } from 'react';
import styles from './BillA4Footer.module.scss';

interface IBillA4FooterProps {
    message: string;
}

export const BillA4Footer = (props: IBillA4FooterProps): ReactElement => {
    const { message } = props;
    return (
        <>
            {message && (
                <div className={styles.wrapper}>
                    <p>{message}</p>
                </div>
            )}
        </>
    );
};

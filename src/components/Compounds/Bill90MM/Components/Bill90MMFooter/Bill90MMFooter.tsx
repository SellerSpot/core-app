import React, { ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMFooter.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

export const Bill90MMFooter = (props: IBill90MMChildProps): ReactElement => {
    const {
        settings,
        data: { billSettings },
    } = props;
    const { remarkMessage } = settings;
    const dateTimeInformation = Date().split(' ');
    const month = dateTimeInformation[1];
    const date = dateTimeInformation[2];
    const year = dateTimeInformation[3];
    const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(new Date());

    return (
        <>
            <div className={mainStyles.PageBreak} />
            {remarkMessage.show && (
                <div className={styles.footerMessageWrapper}>
                    <p>{billSettings.remarkMessage ?? remarkMessage.data}</p>
                </div>
            )}
            <hr className={mainStyles.mainDivider} />
            <div className={styles.billFooterWrapper}>
                <p>{`Date: ${month} ${date}, ${year} at ${time}`}</p>
                <p>{`Receipt: #${23423}`}</p>
            </div>
        </>
    );
};

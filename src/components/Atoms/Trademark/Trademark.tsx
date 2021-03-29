import LogoText from 'assets/svgs/LogoText/LogoText';
import { Logo } from 'assets/svgs/svgs';
import React from 'react';
import styles from './Trademark.module.scss';

export default function Trademark() {
    return (
        <div className={styles.wrapper}>
            <h5 className={styles.poweredBy}>Powered By</h5>
            <div className={styles.logoSpace}>
                <Logo className={styles.logo} />
                <LogoText className={styles.logoText} />
            </div>
        </div>
    );
}

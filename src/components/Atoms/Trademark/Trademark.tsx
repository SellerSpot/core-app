import LogoText from 'assets/svgs/LogoText/LogoText';
import { Logo } from 'assets/svgs/svgs';
import React from 'react';
import styles from './Trademark.module.scss';

export default function Trademark() {
    return (
        <div className={styles.wrapper}>
            <p className={styles.poweredBy}>Powered By</p>
            <div className={styles.logoSpace}>
                <Logo className={styles.logo} />
                <LogoText className={styles.logoText} />
            </div>
        </div>
    );
}

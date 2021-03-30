import LogoText from 'assets/svgs/LogoText/LogoText';
import { Logo } from 'assets/svgs/svgs';
import React, { ReactElement } from 'react';
import styles from './Trademark.module.scss';

export interface ITradeMarkProps {
    url?: string;
}

export default function Trademark(props: ITradeMarkProps): ReactElement {
    const { url } = props;
    const logoClickHandler = () => {
        // check if valid url
        if (url) window.open(url, '__blank');
    };
    return (
        <div className={styles.wrapper}>
            <p className={styles.poweredBy}>Powered By</p>
            <div className={styles.logoSpace} role="link" onClick={logoClickHandler}>
                <Logo className={styles.logo} />
                <LogoText className={styles.logoText} />
            </div>
        </div>
    );
}

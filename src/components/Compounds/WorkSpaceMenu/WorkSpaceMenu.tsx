import Trademark from 'components/Atoms/Trademark/Trademark';
import React from 'react';
import styles from './WorkSpaceMenu.module.scss';

export default function WorkSpaceMenu() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.storeInformationWrapper}></div>
            <div className={styles.workspacesWrapper}></div>
            <div className={styles.trademarkWrapper}>
                <Trademark />
            </div>
        </div>
    );
}

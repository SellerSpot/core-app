import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import React, { ReactElement } from 'react';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import styles from './Management.module.scss';

export const Management = (): ReactElement => {
    return (
        <PageWithMenu>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>Management</div>
        </PageWithMenu>
    );
};

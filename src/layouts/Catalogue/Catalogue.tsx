import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import React, { ReactElement } from 'react';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import styles from './Catalogue.module.scss';

export const Catalogue = (): ReactElement => {
    return (
        <PageWithMenu>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>Catalogue</div>
        </PageWithMenu>
    );
};

import React, { ReactElement } from 'react';

import { PageWithoutMenu } from 'components/Atoms/PageWithoutMenu/PageWithoutMenu';

import styles from './Home.module.scss';

export const Home = (): ReactElement => {
    return (
        <PageWithoutMenu>
            <div className={styles.pageWrapper}>
                <PageWithoutMenu>
                    <h4>Home</h4>
                </PageWithoutMenu>
            </div>
        </PageWithoutMenu>
    );
};

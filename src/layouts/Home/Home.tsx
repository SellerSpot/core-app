import React, { ReactElement } from 'react';

import { PageWithoutMenu } from 'components/Atoms/PageWithoutMenu/PageWithoutMenu';

import styles from './Home.module.scss';
import { HomePage } from 'pages/HomePage/HomePage';

export const Home = (): ReactElement => {
    return (
        <PageWithoutMenu>
            <div className={styles.pageWrapper}>
                <PageWithoutMenu>
                    <HomePage />
                </PageWithoutMenu>
            </div>
        </PageWithoutMenu>
    );
};

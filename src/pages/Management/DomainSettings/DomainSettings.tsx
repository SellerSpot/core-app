import React, { ReactElement } from 'react';
import styles from './DomainSettings.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import DomainUpdateCard from './components/DomainUpdateCard/DomainUpdateCard';
import DomainInformationCard from './components/DomainInformationCard/DomainInformationCard';

export const DomainSettings = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Domain Settings" />
            <div className={styles.bodyWrapper}>
                <DomainUpdateCard />
                <DomainInformationCard />
            </div>
        </div>
    );
};

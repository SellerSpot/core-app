import React, { ReactElement } from 'react';
import { NoPluginsInstalledHeader } from './Components/NoPluginsInstalledHeader/NoPluginsInstalledHeader';
import styles from './HomePage.module.scss';
import { SuggestedPluginsSection } from './Components/SuggestedPluginsSection/SuggestedPluginsSection';
import { useSelector } from 'react-redux';
import { tenantSelector } from 'store/models/app';
import { RecentlyUsedPluginsSection } from './Components/RecentlyUsedPluginsSection/RecentlyUsedPluginsSection';

export const HomePage = (): ReactElement => {
    const tenantDetails = useSelector(tenantSelector);
    return (
        <div className={styles.wrapper}>
            {tenantDetails?.installedPlugins.length === 0 && <NoPluginsInstalledHeader />}
            {tenantDetails?.installedPlugins.length > 0 && <RecentlyUsedPluginsSection />}
            <SuggestedPluginsSection />
        </div>
    );
};

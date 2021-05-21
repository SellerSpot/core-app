import {
    BillingSubMenuIcon,
    CatalogueWorkSpaceIcon,
    DomainSettingsSubMenuIcon,
    HomeWorkSpaceIcon,
    InstalledPluginsSubMenuIcon,
    ManagementWorkSpaceIcon,
    NewSaleSubMenuIcon,
    PluginStoreSubMenuIcon,
    PointOfSaleWorkSpaceIcon,
    SettingsSubMenuIcon,
} from 'assets/customIcons/customIcons';
import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import styles from './CustomIconViewer.module.scss';
import { ICustomIconViewerProps } from './CustomIconViewer.types';

export { ICustomIconViewerProps } from './CustomIconViewer.types';

const IconInstance = (props: ICustomIconViewerProps) => {
    const { color, icon, size } = props;

    const iconProps: IIconProps = {
        color,
        size,
    };

    switch (icon) {
        case 'HomeWorkSpaceIcon':
            return <HomeWorkSpaceIcon {...iconProps} />;
        case 'ManagementWorkSpaceIcon':
            return <ManagementWorkSpaceIcon {...iconProps} />;
        case 'PointOfSaleWorkSpaceIcon':
            return <PointOfSaleWorkSpaceIcon {...iconProps} />;
        case 'CatalogueWorkSpaceIcon':
            return <CatalogueWorkSpaceIcon {...iconProps} />;
        case 'InstalledPluginsSubMenuIcon':
            return <InstalledPluginsSubMenuIcon {...iconProps} />;
        case 'PluginStoreSubMenuIcon':
            return <PluginStoreSubMenuIcon {...iconProps} />;
        case 'DomainSettingsSubMenuIcon':
            return <DomainSettingsSubMenuIcon {...iconProps} />;
        case 'BillingSubMenuIcon':
            return <BillingSubMenuIcon {...iconProps} />;
        case 'SettingsSubMenuIcon':
            return <SettingsSubMenuIcon {...iconProps} />;
        case 'NewSaleSubMenuIcon':
            return <NewSaleSubMenuIcon {...iconProps} />;
    }
};

export const CustomIconViewer = (props: ICustomIconViewerProps): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <IconInstance {...props} />
        </div>
    );
};

import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.bxDownload,
            title: 'Installed Plugins',
            routeKey: 'MANAGEMENT__INSTALLED_PLUGINS',
            redirectRoute: ROUTES.MANAGEMENT__INSTALLED_PLUGINS,
        },
        {
            icon: ICONS.bxStoreAlt,
            title: 'Plugin Store',
            routeKey: 'MANAGEMENT__PLUGIN_STORE',
            redirectRoute: ROUTES.MANAGEMENT__PLUGIN_STORE,
        },
        {
            icon: ICONS.bxLink,
            title: 'Domain Settings',
            routeKey: 'MANAGEMENT__DOMAIN_SETTINGS',
            redirectRoute: ROUTES.MANAGEMENT__DOMAIN_SETTINGS,
        },
        {
            icon: ICONS.purchase,
            title: 'Billing',
            routeKey: 'MANAGEMENT__BILLING',
            redirectRoute: ROUTES.MANAGEMENT__BILLING,
        },
        {
            icon: ICONS.settingsIcon,
            title: 'Settings',
            routeKey: 'MANAGEMENT__SETTINGS',
            redirectRoute: ROUTES.MANAGEMENT__SETTINGS,
        },
    ];

    return <SubMenu tiles={tiles} />;
};

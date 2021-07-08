import Icon from '@iconify/react';
import cn from 'classnames';
import { PluginMenuService } from 'components/Compounds/PluginMenu/PluginMenu.service';
import { ROUTES, TRouteKeys } from 'config/routes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { tenantSelector } from 'store/models/app';
import { routeSelector } from 'store/models/route';
import { ICONS } from 'utilities/utilities';
import { EPLUGINS } from '@sellerspot/universal-types';
import styles from './AppBarHeader.module.scss';

// contains the Plugins that have no subMenu
const noSubMenuPlugins: TRouteKeys[] = ['HOME'];

export const AppBarHeader = (): ReactElement => {
    // hooks
    const { routeKeys } = useSelector(routeSelector);
    const tenantDetails = useSelector(tenantSelector);

    const plugins = [
        ...PluginMenuService.getDefaultPlugins(),
        ...(tenantDetails?.installedPlugins ?? []),
    ];
    const activePluginKey = routeKeys?.[0];

    // getting the Plugin data for the current Plugin
    const pluginData = plugins.find(({ plugin }) => plugin.uniqueName === activePluginKey);

    if (!pluginData) return null; // fix to not found plugin / route

    const isNotHavingSubMenu = noSubMenuPlugins.includes(
        pluginData.plugin.uniqueName as keyof typeof ROUTES,
    );

    const wrapperClassName = cn(styles.wrapper, { [styles.noSubMenuVarient]: isNotHavingSubMenu });

    return (
        <div className={wrapperClassName}>
            <div className={styles.pluginIconWrapper}>
                <Icon
                    icon={ICONS.PLUGIN_ICONS[pluginData.plugin.icon as keyof typeof EPLUGINS]}
                    height="22px"
                />
            </div>
            <div className={styles.pluginTitleWrapper}>
                <span className={styles.pluginTitle}>{pluginData.plugin.name}</span>
            </div>
        </div>
    );
};

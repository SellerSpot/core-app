import Icon from '@iconify/react';
import cn from 'classnames';
import { PluginMenuService } from 'components/Compounds/PluginMenu/PluginMenu.service';
import { TRouteKeys } from 'config/routes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { routeSelector } from 'store/models/route';
import styles from './AppBarHeader.module.scss';

// contains the Plugins that have no subMenu
const noSubMenuPlugins: TRouteKeys[] = ['HOME'];

export const AppBarHeader = (): ReactElement => {
    const { routeKeys } = useSelector(routeSelector);
    const plugins = PluginMenuService.getPlugins();
    const activePluginKey = routeKeys?.[0];

    // getting the Plugin data for the current Plugin
    const pluginData = plugins[activePluginKey] ?? '';

    if (!pluginData) return null; // fix to not found plugin / route

    const isNotHavingSubMenu = noSubMenuPlugins.includes(pluginData.routeKey);

    const wrapperClassName = cn(styles.wrapper, { [styles.noSubMenuVarient]: isNotHavingSubMenu });

    return (
        <div className={wrapperClassName}>
            <div className={styles.pluginIconWrapper}>
                <Icon icon={pluginData.icon} height="22px" />
            </div>
            <div className={styles.pluginTitleWrapper}>
                <span className={styles.pluginTitle}>{pluginData.title}</span>
            </div>
        </div>
    );
};

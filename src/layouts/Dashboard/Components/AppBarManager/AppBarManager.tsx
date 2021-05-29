import { AppBar } from 'components/Compounds/AppBar/AppBar';
import { PluginMenuService } from 'components/Compounds/PluginMenu/PluginMenu.service';
import { TRouteKeys } from 'config/routes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { routeSelector } from 'store/models/route';

// contains the Plugins that have no subMenu
const noSubMenuPlugins: TRouteKeys[] = ['HOME'];

export const AppBarManager = (): ReactElement => {
    const route = useSelector(routeSelector);
    const Plugins = Object.values(PluginMenuService.getPlugins());

    // getting the Plugin data for the current Plugin
    const PluginData = Plugins.find((Plugin) => Plugin.routeKey === route.routeKeys[0]);
    const isNoSubMenu = noSubMenuPlugins.includes(PluginData['routeKey']);

    return <AppBar noSubMenu={isNoSubMenu} currentPlugin={PluginData} />;
};

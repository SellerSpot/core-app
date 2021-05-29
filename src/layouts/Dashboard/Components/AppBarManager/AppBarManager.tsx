import { AppBar } from 'components/Compounds/AppBar/AppBar';
import { WorkSpaceMenuService } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu.service';
import { TRouteKeys } from 'config/routes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { routeSelector } from 'store/models/route';

// contains the workspaces that have no subMenu
const noSubMenuWorkSpaces: TRouteKeys[] = ['HOME'];

export const AppBarManager = (): ReactElement => {
    const route = useSelector(routeSelector);
    const workspaces = Object.values(WorkSpaceMenuService.getWorkSpaces());

    // getting the workspace data for the current workspace
    const workSpaceData = workspaces.find((workspace) => workspace.routeKey === route.routeKeys[0]);
    const isNoSubMenu = noSubMenuWorkSpaces.includes(workSpaceData['routeKey']);

    return <AppBar noSubMenu={isNoSubMenu} currentWorkspace={workSpaceData} />;
};

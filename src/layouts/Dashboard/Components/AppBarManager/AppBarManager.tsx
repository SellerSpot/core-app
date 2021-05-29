import { AppBar, IAppBarProps } from 'components/Compounds/AppBar/AppBar';
import { TRouteKeys } from 'config/routes';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { routeSelector } from 'store/models/route';
import { workSpaceSelector } from 'store/models/workspaces';

// contains the workspaces that have no subMenu
const noSubMenuWorkSpaces: TRouteKeys[] = ['HOME'];

export const AppBarManager = (): ReactElement => {
    const route = useSelector(routeSelector);
    const workspaces = useSelector(workSpaceSelector)['workspaces'];

    // getting the workspace data for the current workspace
    const workSpaceData = workspaces.find((workspace) => workspace.routeKey === route.routeKeys[0]);
    const [breadCrumbs] = useState<IAppBarProps['breadcrumbs']>([]);
    const noSubMenuMode = noSubMenuWorkSpaces.includes(workSpaceData['routeKey']);

    return (
        <AppBar
            breadcrumbs={breadCrumbs}
            noSubMenu={noSubMenuMode}
            currentWorkspace={workSpaceData}
        />
    );
};

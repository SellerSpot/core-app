import { AppBar, IAppBarProps } from 'components/Compounds/AppBar/AppBar';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';

export const AppBarManager = (): ReactElement => {
    const currentWorkspace: IAppBarProps['currentWorkspace'] = {
        workspaceIcon: <ICONS.MdHome size={'20px'} />,
        workspaceTitle: 'Home',
    };
    const breadCrumbs: IAppBarProps['breadcrumbs'] = [
        {
            route: '/home',
            title: 'Home',
        },
    ];

    return <AppBar breadcrumbs={breadCrumbs} currentWorkspace={currentWorkspace} />;
};

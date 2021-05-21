import Icon from '@iconify/react';
import { AppBar, IAppBarProps } from 'components/Compounds/AppBar/AppBar';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TObject } from 'typings/common.types';
import { ICONS } from 'utilities/icons/icons';

const workSpaces: TObject<IAppBarProps['currentWorkspace']> = {
    home: {
        workspaceIcon: <Icon icon={ICONS.homeVariant} height={'20px'} />,
        workspaceTitle: 'Home',
    },
};

export const AppBarManager = (): ReactElement => {
    const location = useLocation();

    // state - define set on updation
    const [currentWorkspace] = useState<keyof typeof workSpaces>('home');
    const [breadCrumbs] = useState<IAppBarProps['breadcrumbs']>([]);

    // effects
    useEffect(() => {
        // find current workspace and update accordingly
    }, [location]);

    useEffect(() => {
        // for bread crumb updation, this also could be derived from
    }, []);

    return <AppBar breadcrumbs={breadCrumbs} currentWorkspace={workSpaces[currentWorkspace]} />;
};

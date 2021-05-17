import { WorkSpaceMenu } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu';
import { IWorkSpaceMenuProps } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu.types';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import { ICONS } from 'utilities/icons';

const tiles: IWorkSpaceMenuProps['tiles'] = [
    {
        icon: <ICONS.MdHome />,
        title: 'Home',
        redirectRoute: '/',
        routesToWatch: ['/'],
    },
    {
        icon: <ICONS.VscSettings />,
        title: 'Management',
        redirectRoute: '/management',
        routesToWatch: ['/management'],
    },
    {
        icon: <ICONS.FaCashRegister />,
        title: 'Point Of Sale',
        redirectRoute: '/pos',
        routesToWatch: ['/pos'],
    },
    {
        icon: <ICONS.FaRegListAlt />,
        title: 'Catalog',
        redirectRoute: '/catalog',
        routesToWatch: ['/catalog'],
    },
];

export const WorkSpaceManager = (): ReactElement => {
    const { tenantDetails } = useSelector(appSelector);
    const { storeName } = tenantDetails;

    const storeInformation: IWorkSpaceMenuProps['storeInformation'] = {
        avatarContent: storeName[0],
        storeName,
    };
    return <WorkSpaceMenu storeInformation={storeInformation} tiles={tiles} />;
};

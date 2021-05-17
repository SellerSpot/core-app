import { WorkSpaceMenu } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu';
import { IWorkSpaceMenuProps } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import { ICONS } from 'utilities/icons';

const tiles: IWorkSpaceMenuProps['tiles'] = [
    {
        icon: <ICONS.MdHome />,
        title: 'Home',
        redirectRoute: ROUTES.HOME,
        routesToWatch: [ROUTES.HOME],
    },
    {
        icon: <ICONS.VscSettings />,
        title: 'Management',
        redirectRoute: ROUTES.MANAGEMENT.DEFAULT,
        routesToWatch: [ROUTES.MANAGEMENT.DEFAULT],
    },
    {
        icon: <ICONS.FaCashRegister />,
        title: 'Point Of Sale',
        redirectRoute: ROUTES.POS.DEFAULT,
        routesToWatch: [ROUTES.POS.DEFAULT],
    },
    {
        icon: <ICONS.FaRegListAlt />,
        title: 'Catalogue',
        redirectRoute: ROUTES.CATALOGUE.DEFAULT,
        routesToWatch: [ROUTES.CATALOGUE.DEFAULT],
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

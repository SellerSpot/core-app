import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: <ICONS.FaCashRegister />,
            title: 'Sales',
            routesToWatch: ['/'],
            childTiles: [
                {
                    title: 'New Sale',
                    routesToWatch: ['/'],
                },
                {
                    title: 'Sales History',
                    routesToWatch: ['/'],
                },
                {
                    title: 'Sales History',
                    routesToWatch: ['/'],
                },
                {
                    title: 'Sales History',
                    routesToWatch: ['/'],
                },
            ],
        },
        {
            icon: <ICONS.BiBox />,
            title: 'Inventory',
            routesToWatch: ['/'],
            childTiles: [
                {
                    title: 'Products',
                    routesToWatch: ['/'],
                },
            ],
        },
        {
            icon: <ICONS.BiReceipt />,
            title: 'Bill Settings',
            routesToWatch: ['/'],
        },
    ];

    return <SubMenu tiles={tiles} />;
};

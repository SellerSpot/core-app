import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: <ICONS.FaCashRegister />,
            title: 'Sales',
            routesToWatch: ['/sales'],
            childTiles: [
                {
                    title: 'New Sale',
                    routesToWatch: ['/sales/newsale'],
                },
                {
                    title: 'Sales History',
                    routesToWatch: ['/sales/saleshistory'],
                },
            ],
        },
        {
            icon: <ICONS.BiBox />,
            title: 'Inventory',
            routesToWatch: ['/inventory'],
            childTiles: [
                {
                    title: 'Products',
                    routesToWatch: ['/products'],
                },
            ],
        },
        {
            icon: <ICONS.BiReceipt />,
            title: 'Bill Settings',
            routesToWatch: ['/sales'],
        },
    ];

    return <SubMenu tiles={tiles} />;
};

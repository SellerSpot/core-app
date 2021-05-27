import Icon from '@iconify/react';
import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: <Icon icon={ICONS.cashRegister} />,
            title: 'Sales',
            selected: false,
            childTiles: [
                {
                    title: 'New Sale',
                    selected: false,
                },
                {
                    title: 'Sales History',
                    selected: false,
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxBox} />,
            title: 'Inventory',
            selected: false,
            childTiles: [
                {
                    title: 'Products',
                    selected: false,
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxReceipt} />,
            title: 'Bill Settings',
            selected: false,
        },
    ];

    return <SubMenu tiles={tiles} />;
};

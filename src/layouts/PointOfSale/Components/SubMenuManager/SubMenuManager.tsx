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
            routeKey: 'POS__SALES',
            childTiles: [
                {
                    title: 'New Sale',
                    routeKey: 'POS__SALES__NEW_SALE',
                },
                {
                    title: 'Sales History',
                    routeKey: 'POS__SALES__SALES_HISTORY',
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxBox} />,
            title: 'Inventory',
            routeKey: 'POS__INVENTORY',
            childTiles: [
                {
                    title: 'Products',
                    routeKey: 'POS__INVENTORY__PRODUCTS',
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxReceipt} />,
            title: 'Bill Settings',
            routeKey: 'POS__BILL_SETTINGS',
        },
    ];

    return <SubMenu tiles={tiles} />;
};

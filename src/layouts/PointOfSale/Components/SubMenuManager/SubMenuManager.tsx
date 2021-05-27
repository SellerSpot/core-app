import Icon from '@iconify/react';
import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: <Icon icon={ICONS.cashRegister} />,
            title: 'Sales',
            routesToWatch: [ROUTES.POS.SALES.NEW_SALE, ROUTES.POS.SALES.SALES_HISTORY],
            childTiles: [
                {
                    title: 'New Sale',
                    routesToWatch: [ROUTES.POS.SALES.NEW_SALE],
                },
                {
                    title: 'Sales History',
                    routesToWatch: [ROUTES.POS.SALES.SALES_HISTORY],
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxBox} />,
            title: 'Inventory',
            routesToWatch: [ROUTES.POS.INVENTORY.PRODUCTS],
            childTiles: [
                {
                    title: 'Products',
                    routesToWatch: [ROUTES.POS.INVENTORY.PRODUCTS],
                },
            ],
        },
        {
            icon: <Icon icon={ICONS.bxReceipt} />,
            title: 'Bill Settings',
            routesToWatch: [ROUTES.POS.BILL_SETTINGS],
        },
    ];

    return <SubMenu tiles={tiles} />;
};

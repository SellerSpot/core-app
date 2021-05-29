import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.cashRegister,
            title: 'Sales',
            routeKey: 'POS__SALES',
            childTiles: [
                {
                    title: 'New Sale',
                    redirectRoute: ROUTES.POS__SALES__NEW_SALE,
                    routeKey: 'POS__SALES__NEW_SALE',
                },
                {
                    title: 'Sales History',
                    redirectRoute: ROUTES.POS__SALES__SALES_HISTORY,
                    routeKey: 'POS__SALES__SALES_HISTORY',
                },
            ],
        },
        {
            icon: ICONS.bxBox,
            title: 'Inventory',
            routeKey: 'POS__INVENTORY',
            childTiles: [
                {
                    title: 'Products',
                    redirectRoute: ROUTES.POS__INVENTORY__PRODUCTS,
                    routeKey: 'POS__INVENTORY__PRODUCTS',
                },
            ],
        },
        {
            icon: ICONS.bxReceipt,
            title: 'Bill Settings',
            redirectRoute: ROUTES.POS__BILL_SETTINGS,
            routeKey: 'POS__BILL_SETTINGS',
        },
    ];

    return <SubMenu tiles={tiles} />;
};

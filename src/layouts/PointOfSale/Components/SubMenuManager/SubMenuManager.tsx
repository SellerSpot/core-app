import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.cashRegister,
            title: 'Sales',
            routeKey: 'POINT_OF_SALE__SALES',
            childTiles: [
                {
                    title: 'New Sale',
                    redirectRoute: ROUTES.POINT_OF_SALE__SALES__NEW_SALE,
                    routeKey: 'POINT_OF_SALE__SALES__NEW_SALE',
                },
                {
                    title: 'Sales History',
                    redirectRoute: ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY,
                    routeKey: 'POINT_OF_SALE__SALES__SALES_HISTORY',
                },
            ],
        },
        {
            icon: ICONS.bxBox,
            title: 'Inventory',
            routeKey: 'POINT_OF_SALE__INVENTORY',
            redirectRoute: ROUTES.POINT_OF_SALE__INVENTORY,
        },
        {
            icon: ICONS.bxReceipt,
            title: 'Bill Settings',
            redirectRoute: ROUTES.POINT_OF_SALE__BILL_SETTINGS,
            routeKey: 'POINT_OF_SALE__BILL_SETTINGS',
        },
    ];

    return <SubMenu tiles={tiles} />;
};

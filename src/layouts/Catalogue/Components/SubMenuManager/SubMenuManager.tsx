import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.productIcon,
            title: 'Products',
            routeKey: 'CATALOGUE__PRODUCTS',
            redirectRoute: ROUTES.CATALOGUE__PRODUCTS,
        },
        {
            icon: ICONS.alphaBCircleOutline,
            title: 'Brands',
            routeKey: 'CATALOGUE__BRANDS',
            redirectRoute: ROUTES.CATALOGUE__BRANDS,
        },
        {
            icon: ICONS.bxCategoryAlt,
            title: 'Categories',
            routeKey: 'CATALOGUE__CATEGORIES',
            redirectRoute: ROUTES.CATALOGUE__CATEGORIES,
        },
        {
            icon: ICONS.alphaUBoxOutline,
            title: 'Stock Units',
            routeKey: 'CATALOGUE__STOCKUNITS',
            redirectRoute: ROUTES.CATALOGUE__STOCKUNITS,
        },
        {
            icon: ICONS.percentOutline,
            title: 'Tax Settings',
            routeKey: 'CATALOGUE__TAXSETTINGS',
            redirectRoute: ROUTES.CATALOGUE__TAXSETTINGS,
        },
        {
            icon: ICONS.cog,
            title: 'Settings',
            routeKey: 'CATALOGUE__SETTINGS',
            redirectRoute: ROUTES.CATALOGUE__SETTINGS,
        },
    ];

    return <SubMenu tiles={tiles} />;
};

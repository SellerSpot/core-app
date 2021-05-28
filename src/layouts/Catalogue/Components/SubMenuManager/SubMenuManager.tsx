import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.productIcon,
            title: 'Products',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.PRODUCTS,
        },
        {
            icon: ICONS.alphaBCircleOutline,
            title: 'Brands',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.BRANDS,
        },
        {
            icon: ICONS.bxCategoryAlt,
            title: 'Categories',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.CATEGORIES,
        },
        {
            icon: ICONS.alphaUBoxOutline,
            title: 'Stock Units',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.STOCKUNITS,
        },
        {
            icon: ICONS.percentOutline,
            title: 'Tax Brackets',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.TAXBRACKETS,
        },
        {
            icon: ICONS.cog,
            title: 'Settings',
            selected: false,
            redirectRoute: ROUTES.CATALOGUE.SETTINGS,
        },
    ];

    return <SubMenu tiles={tiles} />;
};

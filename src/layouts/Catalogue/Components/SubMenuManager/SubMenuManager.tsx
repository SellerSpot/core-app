import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: ICONS.productIcon,
            title: 'Products',
            routesToWatch: [''],
        },
        {
            icon: ICONS.alphaBCircleOutline,
            title: 'Brands',
            routesToWatch: [''],
        },
        {
            icon: ICONS.bxCategoryAlt,
            title: 'Categories',
            routesToWatch: [''],
        },
        {
            icon: ICONS.alphaUBoxOutline,
            title: 'Stock Units',
            routesToWatch: [''],
        },
        {
            icon: ICONS.percentOutline,
            title: 'Tax Brackets',
            routesToWatch: [''],
        },
        {
            icon: ICONS.cog,
            title: 'Settings',
            routesToWatch: [''],
        },
    ];

    return <SubMenu tiles={tiles} />;
};

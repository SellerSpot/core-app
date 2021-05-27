import Icon from '@iconify/react';
import { SubMenu } from 'components/Compounds/SubMenu/SubMenu';
import { ISubMenuProps } from 'components/Compounds/SubMenu/SubMenu.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons/icons';

export const SubMenuManager = (): ReactElement => {
    const tiles: ISubMenuProps['tiles'] = [
        {
            icon: <Icon icon={ICONS.homeVariant} />,
            title: 'Home',
            selected: false,
        },
    ];

    return <SubMenu tiles={tiles} />;
};

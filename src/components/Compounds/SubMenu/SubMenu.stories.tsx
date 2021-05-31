import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ICONS } from 'utilities/utilities';
import { SubMenu as SubMenuComponent } from './SubMenu';
import { ISubMenuProps } from './SubMenu.types';

const Template: Story<ISubMenuProps> = (args: ISubMenuProps) => (
    <BrowserRouter>
        <div
            style={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100vh',
            }}
        >
            <SubMenuComponent {...args} />
        </div>
    </BrowserRouter>
);

export const SubMenu = Template.bind({});
SubMenu.args = {
    tiles: [
        {
            title: 'Sales',
            disabled: false,
            icon: ICONS.cashRegister,
            routeKey: 'POS__SALES',
            redirectRoute: '',
            childTiles: [
                {
                    title: 'New Sales',
                    routeKey: 'POS__SALES__NEW_SALE',
                    redirectRoute: '',
                    disabled: false,
                },
                {
                    title: 'Sales History',
                    routeKey: 'POS__SALES__SALES_HISTORY',
                    redirectRoute: '',
                    disabled: false,
                },
            ],
        },
        {
            title: 'Inventory',
            icon: ICONS.bxBox,
            disabled: false,
            routeKey: 'POS__INVENTORY',
            redirectRoute: '',
            childTiles: [
                {
                    title: 'Products',
                    routeKey: 'POS__INVENTORY__PRODUCTS',
                    disabled: false,
                    redirectRoute: '',
                },
            ],
        },
        {
            title: 'Bill Settings',
            icon: ICONS.billLine,
            disabled: true,
            routeKey: 'POS__BILL_SETTINGS',
            redirectRoute: '',
        },
    ],
} as ISubMenuProps;

export default {
    title: 'Design System/Compounds/Sub Menu',
    component: SubMenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

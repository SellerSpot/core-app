import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ICONS } from 'utilities/icons/icons';
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
            selected: true,
            redirectRoute: '',
            childTiles: [
                {
                    title: 'New Sales',
                    selected: true,
                    redirectRoute: '',
                    disabled: false,
                },
                {
                    title: 'Sales History',
                    selected: false,
                    redirectRoute: '',
                    disabled: false,
                },
            ],
        },
        {
            title: 'Inventory',
            icon: ICONS.bxBox,
            disabled: false,
            selected: false,
            redirectRoute: '',
            childTiles: [
                {
                    title: 'Products',
                    disabled: false,
                    selected: false,
                    redirectRoute: '',
                },
            ],
        },
        {
            title: 'Bill Settings',
            icon: ICONS.billLine,
            disabled: true,
            selected: false,
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

import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ICONS } from 'utilities/icons';

import SubMenuComponent from './SubMenu';
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
            icon: <ICONS.FaCashRegister />,
            routesToWatch: ['/iframe.html'],
            redirectRoute: '',
            childTiles: [
                {
                    title: 'New Sales',
                    routesToWatch: [''],
                    redirectRoute: '',
                    disabled: false,
                },
                {
                    title: 'Sales History',
                    routesToWatch: ['/iframe.html'],
                    redirectRoute: '',
                    disabled: false,
                },
            ],
        },
        {
            title: 'Inventory',
            icon: <ICONS.BiBox />,
            disabled: false,
            routesToWatch: [''],
            redirectRoute: '',
            childTiles: [
                {
                    title: 'Products',
                    disabled: false,
                    routesToWatch: [''],
                    redirectRoute: '',
                },
            ],
        },
        {
            title: 'Bill Settings',
            icon: <ICONS.RiBillLine />,
            disabled: true,
            routesToWatch: [''],
            redirectRoute: '',
        },
    ],
} as ISubMenuProps;

export default {
    title: 'Components',
    component: SubMenuComponent,
} as Meta;

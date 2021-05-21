import { ICONS } from 'utilities/icons/icons';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ISubMenuProps } from './SubMenu.types';
import { SubMenu as SubMenuComponent } from './SubMenu';
import Icon from '@iconify/react';

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
            icon: <Icon icon={ICONS.cashRegister} />,
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
            icon: <Icon icon={ICONS.bxBox} />,
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
            icon: <Icon icon={ICONS.billLine} />,
            disabled: true,
            routesToWatch: [''],
            redirectRoute: '',
        },
    ],
} as ISubMenuProps;

export default {
    title: 'Design System/Compounds/Sub Menu',
    component: SubMenuComponent,
} as Meta;

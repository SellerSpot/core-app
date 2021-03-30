import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import SubMenu from './SubMenu';
import { ISubMenuProps } from './SubMenu.types';

const Template: Story<ISubMenuProps> = (args: ISubMenuProps) => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <div
                    style={{
                        padding: 0,
                        margin: 0,
                        width: '100%',
                        height: '100vh',
                    }}
                >
                    <SubMenu {...args} />
                </div>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export const SubMenuComponent = Template.bind({});
SubMenuComponent.args = {
    tiles: [
        {
            title: 'Sales',
            disabled: false,
            leading: <ICONS.SUBMENUS.SALES />,
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
            leading: <ICONS.SUBMENUS.INVENTORY />,
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
            leading: <ICONS.SUBMENUS.BILLSETTINGS />,
            disabled: true,
            routesToWatch: [''],
            redirectRoute: '',
        },
    ],
} as ISubMenuProps;

export default {
    title: 'Components/Compounds/SubMenuComponent',
    component: SubMenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

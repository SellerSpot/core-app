import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import SubMenu from './SubMenu';
import { ISubMenuProps } from './SubMenu.types';

// demo functional component to help demo the SubMenu component (since it needs state)
function DemoLoader() {
    const subMenuProps: ISubMenuProps = {
        tiles: [
            {
                title: 'Sales',
                disabled: false,
                leading: <ICONS.SalesSubMenu />,
                pathToWatch: ['/iframe.html'],
                childTiles: [
                    {
                        title: 'New Sales',
                        pathToWatch: [''],
                        disabled: false,
                    },
                    {
                        title: 'Sales History',
                        pathToWatch: ['/iframe.html'],
                        disabled: false,
                    },
                ],
            },
            {
                title: 'Inventory',
                leading: <ICONS.InventorySubMenu />,
                disabled: false,
                pathToWatch: [''],
                childTiles: [
                    {
                        title: 'Products',
                        disabled: false,
                        pathToWatch: [''],
                    },
                ],
            },
            {
                title: 'Bill Settings',
                leading: <ICONS.BillSettingsSubMenu />,
                disabled: true,
                pathToWatch: [''],
            },
        ],
    };

    return (
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
                        <SubMenu tiles={subMenuProps.tiles} />
                    </div>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

const Template: Story<ISubMenuProps> = (args: ISubMenuProps) => DemoLoader();

export const SubMenuComponent = Template.bind({});
SubMenuComponent.args = {};

export default {
    title: 'Components/Compounds/SubMenuComponent',
    component: SubMenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

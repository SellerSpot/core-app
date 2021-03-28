import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import SubMenu from './SubMenu';
import { ISubMenuProps } from './SubMenu.types';

// demo functional component to help demo the SubMenu component (since it needs state)
function DemoLoader() {
    // storing the tiles in localstate
    const [tilesState, setTilesState] = useState<ISubMenuProps['tiles']>([
        {
            title: 'Sales',
            childTilesVisible: false,
            disabled: false,
            leading: <ICONS.SalesSubMenu />,
            pathToWatch: ['/iframe.html'],
            events: {
                onClick: (event) => {
                    const dummyTilesState: ISubMenuProps['tiles'] = [];
                    tilesState.map((tile) => {
                        dummyTilesState.push(tile);
                    });
                    console.log(dummyTilesState);
                    dummyTilesState[0].childTilesVisible = !dummyTilesState[0].childTilesVisible;
                    setTilesState(dummyTilesState);
                },
            },
            childTiles: [
                {
                    title: 'New Sales',
                    pathToWatch: [''],
                    disabled: false,
                    events: {
                        onClick: (event) => {
                            console.log('Played');
                        },
                    },
                },
                {
                    title: 'Sales History',
                    pathToWatch: ['/iframe.html'],
                    disabled: false,
                    events: {
                        onClick: (event) => {
                            console.log('Played');
                        },
                    },
                },
            ],
        },
        {
            title: 'Inventory',
            childTilesVisible: false,
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
            events: {
                onClick: (event) => {
                    console.log('Played');
                },
            },
        },
        {
            title: 'Bill Settings',
            childTilesVisible: false,
            leading: <ICONS.BillSettingsSubMenu />,
            disabled: true,
            pathToWatch: [''],
        },
    ]);

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
                        <SubMenu tiles={tilesState} />
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
    title: 'Components/Compounds',
    component: SubMenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

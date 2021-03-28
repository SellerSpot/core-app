import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import Submenu from './Submenu';
import { ISubmenuProps } from './Submenu.types';

// demo functional component to help demo the SubMenu component (since it needs state)
function DemoLoader() {
    // storing the tiles in localstate
    const [tilesState, setTilesState] = useState<ISubmenuProps['tiles']>([
        {
            title: 'Sample',
            childTilesVisible: false,
            disabled: true,
            pathToWatch: [''],
            childTiles: [
                {
                    title: 'SubMenu',
                    pathToWatch: [''],
                    disabled: false,
                },
            ],
        },
        {
            title: 'Sample',
            childTilesVisible: true,
            disabled: false,
            pathToWatch: ['/iframe.html'],
            childTiles: [
                {
                    title: 'SubMenu',
                    disabled: false,
                    pathToWatch: ['/iframe.html'],
                },
            ],
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
                        <Submenu tiles={tilesState} />
                    </div>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

const Template: Story<ISubmenuProps> = (args: ISubmenuProps) => DemoLoader();

export const SubmenuComponent = Template.bind({});
SubmenuComponent.args = {};

export default {
    title: 'Components/Compounds',
    component: SubmenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

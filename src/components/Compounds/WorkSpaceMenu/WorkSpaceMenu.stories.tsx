import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import WorkSpaceMenu from './WorkSpaceMenu';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

const Template: Story<IWorkSpaceMenuProps> = (args: IWorkSpaceMenuProps) => (
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
                    <WorkSpaceMenu {...args} />
                </div>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export const Component = Template.bind({});
Component.args = {
    tiles: [
        {
            icon: <ICONS.WORKSPACES.HOME />,
            title: 'Home',
            routesToWatch: ['/iframe.html'],
        },
        {
            icon: <ICONS.WORKSPACES.MANAGEMENT />,
            title: 'Management',
        },
        {
            icon: <ICONS.WORKSPACES.POS />,
            title: 'POS',
        },
        {
            icon: <ICONS.WORKSPACES.CATALOGUE />,
            title: 'Catalogue',
        },
    ],
    storeInformation: {
        avatarContent: 'S',
        storeName: 'Sreenithi Margin Free Store Store Store Test Store Store Store Store Store Test Store Store Store Store Store Test Store Store',
    },
} as IWorkSpaceMenuProps;

export default {
    title: 'Components/Compounds/WorkSpaceMenu',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

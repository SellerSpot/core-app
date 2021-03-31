import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import AppBar from './AppBar';
import { IAppBarProps } from './AppBar.types';

const Template: Story<IAppBarProps> = (args: IAppBarProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <AppBar {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    breadcrumbs: [
        {
            route: '/management',
            title: 'Management',
        },
        {
            route: '/profile',
            title: 'Profile',
        },
    ],
    currentWorkspace: {
        workspaceIcon: <ICONS.WORKSPACES.MANAGEMENT />,
        workspaceTitle: 'Management',
    },
} as IAppBarProps;

export default {
    title: 'Components/Compounds/AppBar',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

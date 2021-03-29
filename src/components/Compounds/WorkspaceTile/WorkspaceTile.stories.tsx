import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import WorkspaceTile from './WorkspaceTile';
import { IWorkspaceTileProps } from './WorkspaceTile.types';

const Template: Story<IWorkspaceTileProps> = (args: IWorkspaceTileProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <WorkspaceTile {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    expanded: true,
    selected: true,
    workspaceTitle: 'Home',
    workspaceIcon: <ICONS.WORKSPACES.HOME />,
} as IWorkspaceTileProps;

export default {
    title: 'Components/Compounds/WorkspaceTile',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

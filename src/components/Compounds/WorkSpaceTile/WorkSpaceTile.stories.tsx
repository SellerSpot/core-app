import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import WorkSpaceTile from './WorkSpaceTile';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';

const Template: Story<IWorkSpaceTileProps> = (args: IWorkSpaceTileProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <WorkSpaceTile {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    expanded: true,
    selected: true,
    workspaceTitle: 'Home',
    workspaceIcon: <ICONS.WORKSPACES.HOME />,
} as IWorkSpaceTileProps;

export default {
    title: 'Components/Compounds/WorkSpaceTile',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

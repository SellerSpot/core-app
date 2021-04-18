import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import WorkSpaceTileComponent from './WorkSpaceTile';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';

const Template: Story<IWorkSpaceTileProps> = (args: IWorkSpaceTileProps) => (
    <WorkSpaceTileComponent {...args} />
);

export const WorkSpaceTile = Template.bind({});
WorkSpaceTile.args = {
    expanded: false,
    selected: true,
    workspaceTitle: 'Home',
    workspaceIcon: <ICONS.WORKSPACES.HOME />,
    toolTipText: 'sdfsadf',
} as IWorkSpaceTileProps;

export default {
    title: 'Components',
    component: WorkSpaceTileComponent,
} as Meta;

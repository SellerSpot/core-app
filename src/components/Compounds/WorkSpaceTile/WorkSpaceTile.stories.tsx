import { ICONS } from 'utilities/icons';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';
import WorkSpaceTileComponent from './WorkSpaceTile';

const Template: Story<IWorkSpaceTileProps> = (args: IWorkSpaceTileProps) => (
    <WorkSpaceTileComponent {...args} />
);

export const WorkSpaceTile = Template.bind({});
WorkSpaceTile.args = {
    expanded: false,
    selected: true,
    workspaceTitle: 'Home',
    workspaceIcon: <ICONS.MdHome />,
    toolTipText: 'sdfsadf',
} as IWorkSpaceTileProps;

export default {
    title: 'Components',
    component: WorkSpaceTileComponent,
} as Meta;

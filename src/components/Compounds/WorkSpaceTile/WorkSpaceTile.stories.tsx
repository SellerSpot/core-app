import { Meta, Story } from '@storybook/react/types-6-0';
import { ManagementWorkSpaceIcon } from 'assets/customIcons/customIcons';
import React from 'react';
import { WorkSpaceTile as WorkSpaceTileComponent } from './WorkSpaceTile';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';

const Template: Story<IWorkSpaceTileProps> = (args: IWorkSpaceTileProps) => (
    <WorkSpaceTileComponent {...args} />
);

export const WorkSpaceTile = Template.bind({});
WorkSpaceTile.args = {
    expanded: false,
    selected: true,
    workspaceTitle: 'Home',
    workspaceIcon: <ManagementWorkSpaceIcon />,
    toolTipText: 'sdfsadf',
} as IWorkSpaceTileProps;

export default {
    title: 'Design System/Compounds/Work Space Tile',
    component: WorkSpaceTileComponent,
} as Meta;

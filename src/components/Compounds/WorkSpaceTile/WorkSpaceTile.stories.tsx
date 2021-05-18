import { ICONS } from 'utilities/icons';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';
import { WorkSpaceTile as WorkSpaceTileComponent } from './WorkSpaceTile';

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
    title: 'Design System/Compounds/Work Space Tile',
    component: WorkSpaceTileComponent,
} as Meta;

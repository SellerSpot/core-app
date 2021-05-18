import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ISubMenuTileProps } from './SubMenuTile.types';
import SubMenuTileComponent from './SubMenuTile';

const Template: Story<ISubMenuTileProps> = (args: ISubMenuTileProps) => (
    <SubMenuTileComponent {...args} />
);

export const SubMenuTile = Template.bind({});
SubMenuTile.args = {
    miniTile: false,
    title: 'Home',
    selected: false,
    childTilesVisible: false,
    showTailIcon: false,
    disabled: false,
} as ISubMenuTileProps;

export default {
    title: 'Design System/Compounds/Sub Menu Tile',
    component: SubMenuTileComponent,
} as Meta;

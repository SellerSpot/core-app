import Icon from '@iconify/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ICONS } from 'utilities/icons/icons';
import { PluginMenuTile as PluginMenuTileComponent } from './PluginMenuTile';
import { IPluginMenuTileProps } from './PluginMenuTile.types';

const Template: Story<IPluginMenuTileProps> = (args: IPluginMenuTileProps) => (
    <PluginMenuTileComponent {...args} />
);

export const PluginMenuTile = Template.bind({});
PluginMenuTile.args = {
    expanded: false,
    selected: true,
    PluginTitle: 'Home',
    PluginIcon: <Icon icon={ICONS.settingsIcon} />,
    toolTipText: 'sdfsadf',
} as IPluginMenuTileProps;

export default {
    title: 'Design System/Compounds/Plugin Menu Tile',
    component: PluginMenuTileComponent,
} as Meta;

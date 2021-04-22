import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ICONS } from 'utilities/icons';
import PluginCardComponent from './PluginCard';
import { IPluginCardProps } from './PluginCard.types';

const Template: Story = (args: IPluginCardProps) => <PluginCardComponent {...args} />;
export const PluginCard = Template.bind({});
PluginCard.args = {
    installed: false,
    imageUrl: 'https://i.ibb.co/yBQQ8rx/pos-Plugin-Illustration.png',
    pluginName: 'Point of Sale',
    pluginIcon: <ICONS.FaCashRegister />,
    pluginDescription: 'An all purpose point of sale system to handle your everyday sales',
} as IPluginCardProps;
export default {
    title: 'Components',
    component: PluginCardComponent,
} as Meta;

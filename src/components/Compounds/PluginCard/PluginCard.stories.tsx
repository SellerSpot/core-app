import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ICONS } from 'utilities/utilities';
import PluginCardComponent from './PluginCard';
import { IPluginCardProps } from './PluginCard.types';

const Template: Story = (args: IPluginCardProps) => {
    return <PluginCardComponent {...args} />;
};
export const PluginCard = Template.bind({});
PluginCard.args = {
    isInstalled: false,
    image: 'https://picsum.photos/id/237/200/300',
    name: 'Point of Sale',
    icon: ICONS.cashRegister,
    description: 'An all purpose point of sale system to handle your everyday sales',
} as IPluginCardProps;
export default {
    title: 'Core App/Compounds/Plugin Card',
    component: PluginCardComponent,
} as Meta;

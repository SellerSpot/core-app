import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import PluginCard from './PluginCard';
import { IPluginCardProps } from './PluginCard.types';

const Template: Story = (args: IPluginCardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <PluginCard {...args} />
        </ThemeProvider>
    </Provider>
);
export const Component = Template.bind({});
Component.args = {
    installed: false,
} as IPluginCardProps;
export default {
    title: 'Components/Compounds/PluginCard',
    component: Component,
} as Meta;

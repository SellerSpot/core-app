import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import PluginCard from './PluginCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <PluginCard />
        </ThemeProvider>
    </Provider>
);
export const Component = Template.bind({});
export default {
    title: 'Components/Compounds/PluginCard',
    component: Component,
} as Meta;

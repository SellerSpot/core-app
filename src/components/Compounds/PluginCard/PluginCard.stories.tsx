import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import PluginCardComponent from './PluginCard';
import { IPluginCardProps } from './PluginCard.types';

const Template: Story = (args: IPluginCardProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <PluginCardComponent {...args} />
        </ThemeProvider>
    </Provider>
);
export const PluginCard = Template.bind({});
PluginCard.args = {
    installed: false,
} as IPluginCardProps;
export default {
    title: 'Components/Compounds',
    component: PluginCardComponent,
} as Meta;

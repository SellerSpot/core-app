import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Trademark from './Trademark';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Trademark />
        </ThemeProvider>
    </Provider>
);

export const TrademarkComponent = Template.bind({});
TrademarkComponent.args = {};

export default {
    title: 'Components/Atoms/TrademarkComponent',
    component: TrademarkComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

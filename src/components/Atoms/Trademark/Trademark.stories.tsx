import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import TrademarkComponent from './Trademark';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <TrademarkComponent />
        </ThemeProvider>
    </Provider>
);

export const TradeMark = Template.bind({});
TradeMark.args = {};

export default {
    title: 'Components/Atoms',
    component: TrademarkComponent,
} as Meta;

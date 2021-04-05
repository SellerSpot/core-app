import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DeleteAccountCard from './DeleteAccountCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <DeleteAccountCard />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});

export default {
    title: 'Components/Compounds/DeleteAccountCard',
    component: Component,
} as Meta;

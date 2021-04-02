import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainUpdateCard from './DomainUpdateCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <DomainUpdateCard />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});

export default {
    title: 'Components/Compounds/DomainUpdateCard',
    component: Component,
} as Meta;

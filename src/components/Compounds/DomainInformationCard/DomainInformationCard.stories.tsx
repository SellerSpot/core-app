import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainInformationCard from './DomainInformationCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <DomainInformationCard />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});

export default {
    title: 'Components/Compounds/DomainInformationCard',
    component: Component,
} as Meta;

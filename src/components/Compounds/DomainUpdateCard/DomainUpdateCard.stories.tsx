import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DomainUpdateCardComponent from './DomainUpdateCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <DomainUpdateCardComponent />
        </ThemeProvider>
    </Provider>
);

export const DomainUpdateCard = Template.bind({});

export default {
    title: 'Components/Compounds',
    component: DomainUpdateCardComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;

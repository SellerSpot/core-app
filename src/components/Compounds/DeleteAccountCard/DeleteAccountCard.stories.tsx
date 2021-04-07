import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import DeleteAccountCardComponent from './DeleteAccountCard';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <DeleteAccountCardComponent />
        </ThemeProvider>
    </Provider>
);

export const DeleteAccountCard = Template.bind({});

export default {
    title: 'Components/Compounds',
    component: DeleteAccountCardComponent,
} as Meta;

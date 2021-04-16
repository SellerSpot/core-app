import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import CartTableComponent from './CartTable';

const Template: Story = () => {
    return (
        <div
            style={{
                width: '500px',
            }}
        >
            <CartTableComponent />
        </div>
    );
};

export const CartTable = Template.bind({});

export default {
    title: 'Components/Compounds',
    component: CartTableComponent,
} as Meta;

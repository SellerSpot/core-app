import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
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
    title: 'Components',
    component: CartTableComponent,
} as Meta;

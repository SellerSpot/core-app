import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
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
    title: 'Design System/Compounds/Cart Table',
    component: CartTableComponent,
} as Meta;

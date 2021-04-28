import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';
import SaleSearchResultCardComponent from './SaleSearchResultCard';

const Template: Story = (args: ISaleSearchResultCard) => (
    <div
        style={{
            width: '400px',
        }}
    >
        <SaleSearchResultCardComponent {...args} />
    </div>
);
export const SaleSearchResultCard = Template.bind({});
SaleSearchResultCard.args = {
    productName: 'Tomatoes',
    stockUnit: 'Kg',
    unitPrice: 200,
    productImage: 'https://i.ibb.co/MZMJMCn/Rectangle-18.png',
} as ISaleSearchResultCard;
export default {
    title: 'Components',
    component: SaleSearchResultCardComponent,
} as Meta;

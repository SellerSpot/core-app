import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import {
    ProductsInventoryTable as ProductsInventoryTableComponent,
    IProductsInventoryTableProps,
} from './ProductsInventoryTable';

const Template: Story<IProductsInventoryTableProps> = (args: IProductsInventoryTableProps) => (
    <ProductsInventoryTableComponent {...args} />
);

export const ProductsInventoryTable = Template.bind({});
ProductsInventoryTable.args = {
    products: [
        {
            active: true,
            productName: 'Sample Product',
            brand: 'Brand',
            category: 'Category',
            description:
                'This is demo of a super long description of the product which we are goona use to describe the product to anyone who uses this software',
            availableStock: '20 pcs',
            sellingPrice: numberFormatINRCurrency(234),
        },
    ],
} as IProductsInventoryTableProps;

export default {
    title: 'Design System/Compounds/Products Inventory Table',
    component: ProductsInventoryTableComponent,
} as Meta;

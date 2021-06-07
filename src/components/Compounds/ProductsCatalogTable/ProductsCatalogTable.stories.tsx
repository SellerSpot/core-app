import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import {
    ProductsCatalogTable as ProductsCatalogTableComponent,
    IProductsCatalogTableProps,
} from './ProductsCatalogTable';

const Template: Story<IProductsCatalogTableProps> = (args: IProductsCatalogTableProps) => (
    <ProductsCatalogTableComponent {...args} />
);

export const ProductsCatalogTable = Template.bind({});
ProductsCatalogTable.args = {
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
} as IProductsCatalogTableProps;

export default {
    title: 'Core App/Compounds/Products Catalog Table',
    component: ProductsCatalogTableComponent,
} as Meta;

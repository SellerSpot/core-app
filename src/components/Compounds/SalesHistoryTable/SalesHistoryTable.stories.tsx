import { numberFormatINRCurrency } from 'utilities/general';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
    SalesHistoryTable as SalesHistoryComponent,
    ISalesHistoryTableProps,
} from './SalesHistoryTable';

const Template: Story<ISalesHistoryTableProps> = (args: ISalesHistoryTableProps) => (
    <SalesHistoryComponent {...args} />
);

export const SalesHistoryTable = Template.bind({});
SalesHistoryTable.args = {
    saleHistory: [
        {
            saleTime: '2 minutes ago',
            cashier: 'Rohit',
            customer: 'Immi',
            saleTotal: numberFormatINRCurrency(2000),
            balance: numberFormatINRCurrency(20),
            subTotal: numberFormatINRCurrency(220),
            totalTax: numberFormatINRCurrency(20),
            status: 'completed',
            products: [
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
            ],
        },
        {
            saleTime: '2 minutes ago',
            cashier: 'Rohit',
            customer: 'Immi',
            saleTotal: numberFormatINRCurrency(2000),
            balance: numberFormatINRCurrency(20),
            subTotal: numberFormatINRCurrency(220),
            totalTax: numberFormatINRCurrency(20),
            status: 'completed',
            products: [
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
            ],
        },
        {
            saleTime: '2 minutes ago',
            cashier: 'Rohit',
            customer: 'Immi',
            saleTotal: numberFormatINRCurrency(2000),
            balance: numberFormatINRCurrency(20),
            subTotal: numberFormatINRCurrency(220),
            totalTax: numberFormatINRCurrency(20),
            status: 'completed',
            products: [
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
                {
                    productName: 'Sample Product',
                    quantity: 1,
                    subTotal: numberFormatINRCurrency(150),
                    taxAmount: numberFormatINRCurrency(60),
                    unitPrice: numberFormatINRCurrency(90),
                },
            ],
        },
    ],
} as ISalesHistoryTableProps;

export default {
    title: 'Components',
    component: SalesHistoryComponent,
} as Meta;

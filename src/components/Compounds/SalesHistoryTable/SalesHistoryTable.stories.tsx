import { numberFormatINRCurrency } from 'utilities/general';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
    SalesHistoryTable as SalesHistoryComponent,
    ISalesHistoryTableProps,
} from './SalesHistoryTable';

const Template: Story<ISalesHistoryTableProps> = (args: ISalesHistoryTableProps) => (
    <div
        style={{
            height: '100vh',
            width: '100%',
        }}
    >
        <SalesHistoryComponent {...args} />
    </div>
);

export const SalesHistoryTable = Template.bind({});
SalesHistoryTable.args = {
    saleHistory: [
        {
            saleTime: '2 minutes ago',
            cashier: 'Rohit',
            customer: 'Immi',
            saleTotal: numberFormatINRCurrency(2000),
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
    title: 'Components/Fullscreen',
    component: SalesHistoryComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

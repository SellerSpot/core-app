import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import { Bill90MM as Bill90MMComponent, IBill90MMProps } from './Bill90MM';

const Template: Story<IBill90MMProps> = (args: IBill90MMProps) => <Bill90MMComponent {...args} />;

export const Bill90MM = Template.bind({});
Bill90MM.args = {
    billData: {
        products: [
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product',
                subTotal: numberFormatINRCurrency(24),
                quantity: 2,
                unitPrice: numberFormatINRCurrency(12),
                stockUnit: 'pcs',
            },
            {
                name: 'Sample Product',
                subTotal: numberFormatINRCurrency(24),
                quantity: 2,
                unitPrice: numberFormatINRCurrency(12),
                stockUnit: 'pcs',
                discount: numberFormatINRCurrency(12),
            },
        ],
        saleDiscount: numberFormatINRCurrency(230),
        saleSubTotal: numberFormatINRCurrency(200),
        saleTotalTax: numberFormatINRCurrency(25),
        saleTotalTaxPercentage: 13,
        storeName: 'Sreenithi Margin Free',
        saleTotal: numberFormatINRCurrency(250000),
        footerMessage: 'Sample Footer Message',
        headerMessage: 'Sample Header Message',
    },
} as IBill90MMProps;

export default {
    title: 'Design System/Compounds/Bill 90 MM',
    component: Bill90MMComponent,
} as Meta;

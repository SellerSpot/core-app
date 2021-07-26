import { CSSProperties } from '@material-ui/styles';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import { Bill90MM, IBill90MMProps } from '../Bill90MM/Bill90MM';
import { BillHolder as BillHolderComponent } from './BillHolder';

const args = {
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
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
        ],
        saleDiscount: numberFormatINRCurrency(230),
        saleSubTotal: numberFormatINRCurrency(200),
        saleTotalTax: numberFormatINRCurrency(25),
        saleTotalTaxPercentage: 13,
        storeName: 'Sreenithi Margin Free',
        storeAddress: 'store address',
        saleTotal: numberFormatINRCurrency(250000),
        headerMessage: 'Sample Header Message',
    },
} as IBill90MMProps;

const Template: Story = () => {
    const wrapperDivStyles: CSSProperties = {
        width: '100vw',
        height: '100vh',
    };
    return (
        <div style={wrapperDivStyles}>
            <BillHolderComponent>
                <Bill90MM billData={args.billData} />
            </BillHolderComponent>
        </div>
    );
};

export const BillHolder = Template.bind({});

export default {
    title: 'Core App/Compounds/Bill Holder',
    parameters: {
        layout: 'fullscreen',
    },
    component: BillHolderComponent,
} as Meta;

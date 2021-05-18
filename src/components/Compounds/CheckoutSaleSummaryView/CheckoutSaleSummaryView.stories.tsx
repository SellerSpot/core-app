import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    CheckoutSaleSummaryView as CheckoutSaleSummaryViewComponent,
    ICheckoutSaleSummaryViewProps,
} from './CheckoutSaleSummaryView';

const Template: Story<ICheckoutSaleSummaryViewProps> = (args: ICheckoutSaleSummaryViewProps) => (
    <CheckoutSaleSummaryViewComponent {...args} />
);

export const CheckoutSaleSummaryView = Template.bind({});
CheckoutSaleSummaryView.args = {
    subTotal: 200,
    grandTotal: 230,
    totalDiscount: -20,
    totalTaxes: 50,
} as ICheckoutSaleSummaryViewProps;

export default {
    title: 'Design System/Compounds/Checkout Sale Summary View',
    component: CheckoutSaleSummaryViewComponent,
} as Meta;

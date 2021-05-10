import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { OutletsTable as OutletsTableComponent, IOutletsTableProps } from './OutletsTable';

const Template: Story<IOutletsTableProps> = (args: IOutletsTableProps) => (
    <OutletsTableComponent {...args} />
);

export const OutletsTable = Template.bind({});
OutletsTable.args = {
    data: [
        {
            outletName: 'Trichy',
            stockUnit: 'pcs',
            currentStock: 23,
            markupPercentage: 12,
            retailPrice: 200,
            supplyPrice: 150,
        },
        {
            outletName: 'Musiri',
            stockUnit: 'pcs',
            currentStock: 25,
            markupPercentage: 15,
            retailPrice: 205,
            supplyPrice: 155,
        },
        {
            outletName: 'Kerala',
            stockUnit: 'pcs',
            currentStock: 43,
            markupPercentage: 42,
            retailPrice: 240,
            supplyPrice: 140,
        },
    ],
} as IOutletsTableProps;

export default {
    title: 'Components',
    component: OutletsTableComponent,
} as Meta;

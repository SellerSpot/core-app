import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TaxGroupsTable as TaxGroupsTableComponent, ITaxGroupsTableProps } from './TaxGroupsTable';

const Template: Story<ITaxGroupsTableProps> = (args: ITaxGroupsTableProps) => (
    <div
        style={{
            maxHeight: '500px',
        }}
    >
        <TaxGroupsTableComponent {...args} />
    </div>
);

export const TaxGroupsTable = Template.bind({});
TaxGroupsTable.args = {
    taxGroups: [
        {
            name: 'GST',
            noOfTaxes: 2,
            taxGroupRate: '14%',
            noOfProducts: 12,
            brackets: [
                {
                    bracketName: 'Sample Tax Bracket',
                    rate: '9%',
                },
            ],
        },
        {
            name: 'CGST',
            noOfTaxes: 2,
            taxGroupRate: '14%',
            noOfProducts: 12,
            brackets: [
                {
                    bracketName: 'Sample Tax Bracket',
                    rate: '9%',
                },
            ],
        },
    ],
} as ITaxGroupsTableProps;

export default {
    title: 'Core App/Compounds/Tax Groups Table',
    component: TaxGroupsTableComponent,
} as Meta;

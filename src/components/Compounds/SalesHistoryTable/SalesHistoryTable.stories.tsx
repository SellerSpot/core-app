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
SalesHistoryTable.args = {} as ISalesHistoryTableProps;

export default {
    title: 'Components',
    component: SalesHistoryComponent,
} as Meta;

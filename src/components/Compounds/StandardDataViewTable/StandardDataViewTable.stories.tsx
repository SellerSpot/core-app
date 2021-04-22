import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    StandardDataViewTable as StandardDataViewTableComponent,
    IStandardDataViewTableProps,
} from './StandardDataViewTable';

const Template: Story<IStandardDataViewTableProps> = (args: IStandardDataViewTableProps) => (
    <div
        style={{
            maxHeight: '500px',
        }}
    >
        <StandardDataViewTableComponent {...args} />
    </div>
);

export const StandardDataViewTable = Template.bind({});
StandardDataViewTable.args = {
    tableItems: [
        {
            name: 'Brand Name',
            description: 'Brand Description',
            noOfProducts: 12,
            deleteItemCallback: () => console.log('Item Deleted'),
            editItemCallback: () => console.log('Item Edit'),
        },
        {
            name: 'Brand Name 2',
            description: 'Brand Description 2',
            noOfProducts: 12,
            deleteItemCallback: () => console.log('Item Deleted'),
            editItemCallback: () => console.log('Item Edit'),
        },
    ],
} as IStandardDataViewTableProps;

export default {
    title: 'Components',
    component: StandardDataViewTableComponent,
} as Meta;

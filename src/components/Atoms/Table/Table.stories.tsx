import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import TableComponent from './Table';
import { ITableProps } from './Table.types';

const Template: Story<ITableProps> = (args: ITableProps) => <TableComponent {...args} />;

export const Table = Template.bind({});
Table.args = {
    headers: [
        {
            content: 'Sno',
        },
        {
            content: 'Name',
        },
        {
            content: 'Password',
        },
    ],
    rowData: [
        [
            {
                content: '1',
            },
            {
                content: 'Rohit',
            },
            {
                content: 'passwordstring',
            },
        ],
    ],
} as ITableProps;

export default {
    title: 'Components/Atoms',
    component: TableComponent,
} as Meta;

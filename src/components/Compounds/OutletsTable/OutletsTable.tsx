import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement, useEffect } from 'react';
import create from 'zustand';
import {
    CurrentStockField,
    MarkupPercentageField,
    RetailPriceField,
    SupplyPriceField,
} from './Components/OutletsTableFields';
import { IOutletsTableProps, TUseOutletTableState } from './OutletsTable.types';
export { IOutletsTableProps } from './OutletsTable.types';

export const useOutletTableState = create<TUseOutletTableState>((set) => ({
    data: [],
    setData: (data) => {
        set({ data });
    },
}));

const headers: ITableProps['headers'] = [
    {
        content: 'Outlet',
        width: '15%',
    },
    {
        content: 'Current Stock',
        width: '23%',
    },
    {
        content: 'Supply Price',
        width: '19%',
    },
    {
        content: 'Markup',
        width: '19%',
    },
    {
        content: 'Retail Price',
        width: '19%',
    },
];

const getTableBody = (props: { data: IOutletsTableProps['data'] }): ITableRow[] => {
    const { data } = props;
    return data.map((outlet, outletIndex) => {
        const { outletName } = outlet;
        return {
            cells: [
                {
                    content: <h6 key={outletIndex}>{outletName}</h6>,
                },
                {
                    content: <CurrentStockField outletIndex={outletIndex} outlet={outlet} />,
                },
                {
                    content: <SupplyPriceField outlet={outlet} outletIndex={outletIndex} />,
                },
                {
                    content: <MarkupPercentageField outlet={outlet} outletIndex={outletIndex} />,
                },
                {
                    content: <RetailPriceField outlet={outlet} outletIndex={outletIndex} />,
                },
            ],
        };
    });
};

export const OutletsTable = (props: IOutletsTableProps): ReactElement => {
    const { data } = props;
    const { setData } = useOutletTableState();
    // setting data into the store
    useEffect(() => {
        setData(data);
    }, [data]);

    const tableBody: ITableProps['body'] = ({}) => {
        return getTableBody({ data });
    };
    return <Table size="small" headers={headers} body={tableBody} />;
};

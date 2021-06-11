import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductsPageState } from '../../Products.types';
import { ProductsTableService } from './ProductsTable.service';

export const ProductsTable = (props: { pageState: State<IProductsPageState> }): ReactElement => {
    // props
    const { pageState } = props;

    const tableProps = ProductsTableService.getTableProps({ pageState });

    // draw
    return <Table {...tableProps} />;
};

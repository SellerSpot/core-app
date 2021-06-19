import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductPageState } from '../../Product.types';
import { ProductTableService } from './ProductTable.service';

export const ProductTable = (props: { pageState: State<IProductPageState> }): ReactElement => {
    // props
    const { pageState } = props;

    const tableProps = ProductTableService.getTableProps({ pageState });

    // draw
    return <Table {...tableProps} />;
};

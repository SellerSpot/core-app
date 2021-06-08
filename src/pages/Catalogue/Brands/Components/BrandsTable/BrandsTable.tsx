import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IBrandsPageProps } from '../../Brands.types';
import { BrandsTableService } from './BrandsTable.service';

export const BrandsTable = (props: { pageState: State<IBrandsPageProps> }): ReactElement => {
    // props
    const { pageState } = props;

    // compute
    const tableProps = BrandsTableService.getTableProps(pageState.brands.get());

    // draw
    return <Table {...tableProps} />;
};

import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IStockUnitPageState } from '../../StockUnit.types';
import { StockUnitTableService } from './StockUnitTable.service';

export const StockUnitTable = (props: { pageState: State<IStockUnitPageState> }): ReactElement => {
    // props
    const { pageState } = props;

    // compute
    const tableProps = StockUnitTableService.getTableProps({ pageState });

    // draw
    return <Table {...tableProps} />;
};

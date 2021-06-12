import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IStockUnitPageState } from '../../StockUnits.types';
import { StockUnitsTableService } from './StockUnitsTable.service';

export const StockUnitsTable = (props: { pageState: State<IStockUnitPageState> }): ReactElement => {
    // props
    const { pageState } = props;

    // compute
    const tableProps = StockUnitsTableService.getTableProps({ pageState });

    // draw
    return <Table {...tableProps} />;
};

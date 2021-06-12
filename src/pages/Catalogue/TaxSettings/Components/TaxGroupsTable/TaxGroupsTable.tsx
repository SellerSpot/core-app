import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ITaxSettingsState } from '../../TaxSettings.types';
import { TaxGroupsTableService } from './TaxGroupsTable.service';

export const TaxGroupsTable = (props: { pageState: State<ITaxSettingsState> }): ReactElement => {
    // props
    const { pageState } = props;

    // compute
    const tableProps = TaxGroupsTableService.getTableProps({ pageState });

    // draw
    return <Table {...tableProps} />;
};

import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ITaxSettingsState } from '../../../TaxSettings.types';
import { TaxBracketsTableService } from './TaxBracketTable.service';

export const TaxBracketsTable = (props: { pageState: State<ITaxSettingsState> }): ReactElement => {
    // props
    const { pageState } = props;

    // compute
    const tableProps = TaxBracketsTableService.getTableProps({ pageState });

    // state
    return <Table {...tableProps} />;
};

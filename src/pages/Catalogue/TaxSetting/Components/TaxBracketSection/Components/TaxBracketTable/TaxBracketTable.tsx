import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement } from 'react';
import { TaxBracketTableService } from './TaxBracketTable.service';

interface ITaxBracketTableProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
}

export const TaxBracketTable = (props: ITaxBracketTableProps): ReactElement => {
    // props
    const { sectionState } = props;

    // handlers
    const editItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        console.log(taxBracketData);
    };
    const deleteItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        console.log(taxBracketData);
    };

    // compile table data
    const tableProps = TaxBracketTableService.getTableProps({
        allTaxBrackets: sectionState.allTaxBrackets.get(),
        deleteItemClickHandler,
        editItemClickHandler,
        isTableLoading: sectionState.isTableLoading.get(),
    });

    return <Table {...tableProps} />;
};

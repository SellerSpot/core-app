import { State, useState } from '@hookstate/core';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useEffect } from 'react';
import { Table } from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { TaxBracketTableService } from './TaxBracketTable.service';

interface ITaxBracketTableProps {
    pageState: State<ITaxSettingPageState>;
}

export const TaxBracketTable = (props: ITaxBracketTableProps): ReactElement => {
    // props
    const { pageState } = props;

    // state
    const isLoading = useState(false);

    // handlers
    const getAllTaxBrackets = async () => {
        isLoading.set(true);
        const allTaxBrackets = await TaxBracketTableService.getAllTaxBracket();
        pageState.allBrackets.set(allTaxBrackets);
        isLoading.set(false);
    };
    const editItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        console.log(taxBracketData);
    };
    const deleteItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        console.log(taxBracketData);
    };

    // effects
    useEffect(() => {
        getAllTaxBrackets();
    }, []);

    // compile table data
    const tableProps = TaxBracketTableService.getTableProps({
        allTaxBrackets: pageState.allBrackets.get(),
        deleteItemClickHandler,
        editItemClickHandler,
        isTableLoading: isLoading.get(),
    });

    return <Table {...tableProps} />;
};

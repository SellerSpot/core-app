import { useState } from '@hookstate/core';
import React, { ReactElement, useEffect } from 'react';
import { ITaxGroupData } from '@sellerspot/universal-types';
import { TaxGroupTableService } from './TaxGroupTable.service';
import { Table } from '@sellerspot/universal-components';

export const TaxGroupTable = (): ReactElement => {
    // state
    const isLoading = useState(false);
    const allTaxGroups = useState<ITaxGroupData[]>([]);

    // handlers
    const getAllTaxGroups = async () => {
        isLoading.set(true);
        const getAllTaxGroups = await TaxGroupTableService.getAllTaxGroup();
        allTaxGroups.set(getAllTaxGroups);
        isLoading.set(false);
    };
    const editItemClickHandler = (taxGroupData: ITaxGroupData) => async () => {
        console.log(taxGroupData);
    };
    const deleteItemClickHandler = (taxGroupData: ITaxGroupData) => async () => {
        console.log(taxGroupData);
    };

    // effects
    useEffect(() => {
        getAllTaxGroups();
    }, []);

    // compile table data
    const tableProps = TaxGroupTableService.getTableProps({
        allTaxBrackets: allTaxGroups.get(),
        deleteItemClickHandler,
        editItemClickHandler,
        isTableLoading: isLoading.get(),
    });

    // draw
    return <Table {...tableProps} />;
};

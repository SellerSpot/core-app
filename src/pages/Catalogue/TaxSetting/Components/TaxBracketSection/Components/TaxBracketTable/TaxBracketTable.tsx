import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement } from 'react';
import { rawClone } from 'utilities/general';
import { TaxBracketTableService } from './TaxBracketTable.service';

interface ITaxBracketTableProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
    getAllTaxBracket: () => Promise<void>;
}

export const TaxBracketTable = (props: ITaxBracketTableProps): ReactElement => {
    // props
    const { sectionState, getAllTaxBracket } = props;

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const editItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        sectionState.sliderModal.merge({
            mode: 'edit',
            prefillData: {
                id: taxBracketData.id,
                name: taxBracketData.name,
                rate: taxBracketData.rate,
            },
            showModal: true,
        });
    };
    const deleteItemClickHandler = (taxBracketData: ITaxBracketData) => async () => {
        const confirmResponse = await confirmDialog.confirm({
            title: 'Are you sure?',
            content: `This action will delete tax bracket "${taxBracketData.name}" from your catalogue`,
            primaryButtonProps: {
                label: 'Delete Tax Bracket',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'Cancel',
                theme: 'primary',
            },
        });
        if (confirmResponse) {
            confirmDialog.setLoading({ isLoading: true });
            await TaxBracketTableService.deleteTaxBracket({ taxBracketId: taxBracketData.id });
            await getAllTaxBracket();
            confirmDialog.setLoading({ isLoading: true });
        }
        confirmDialog.closeDialog();
    };

    // compile table data
    const tableProps = TaxBracketTableService.getTableProps({
        allTaxBrackets: rawClone(sectionState.allTaxBrackets.get()),
        deleteItemClickHandler,
        editItemClickHandler,
        isTableLoading: sectionState.isTableLoading.get(),
        taxBracketSliderModalState: sectionState.sliderModal,
    });

    return <Table {...tableProps} />;
};

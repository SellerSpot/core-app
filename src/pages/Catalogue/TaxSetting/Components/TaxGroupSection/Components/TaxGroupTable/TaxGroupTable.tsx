import { State } from '@hookstate/core';
import { IButtonProps, Table } from '@sellerspot/universal-components';
import { ITaxGroupData } from '@sellerspot/universal-types';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement } from 'react';
import { TaxGroupTableService } from './TaxGroupTable.service';

interface ITaxGroupTableProps {
    sectionState: State<ITaxSettingPageState['taxGroupSection']>;
    getAllTaxGroups: () => Promise<void>;
}

export const TaxGroupTable = (props: ITaxGroupTableProps): ReactElement => {
    // props
    const { sectionState, getAllTaxGroups } = props;

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const editItemClickHandler =
        (taxGroupData: ITaxGroupData): IButtonProps['onClick'] =>
        async (event) => {
            // stop propagation
            event.stopPropagation();
            // update state
            sectionState.sliderModal.merge({
                mode: 'edit',
                showModal: true,
                prefillData: taxGroupData,
            });
        };
    const deleteItemClickHandler =
        (taxGroupData: ITaxGroupData): IButtonProps['onClick'] =>
        async (event) => {
            // stop propagation
            event.stopPropagation();
            // compute
            const confirmResult = await confirmDialog.confirm({
                title: 'Are you sure?',
                content: `This action will delete the tax group "${taxGroupData.name}" permanently`,
                primaryButtonProps: {
                    label: 'Delete',
                    theme: 'danger',
                },
                secondaryButtonProps: {
                    label: 'Cancel',
                    theme: 'primary',
                },
                theme: 'warning',
            });
            if (confirmResult) {
                confirmDialog.setLoading({ isLoading: true });
                await TaxGroupTableService.deleteTaxGroup({ taxGroupId: taxGroupData.id });
                debugger;
                confirmDialog.setLoading({ isLoading: false });
                getAllTaxGroups();
                confirmDialog.closeDialog();
            } else {
                confirmDialog.closeDialog();
            }
        };

    // compile table data
    const tableProps = TaxGroupTableService.getTableProps({
        allTaxBrackets: sectionState.allTaxGroups.get(),
        deleteItemClickHandler,
        editItemClickHandler,
        isTableLoading: sectionState.isTableLoading.get(),
        taxGroupSliderModalState: sectionState.sliderModal,
    });

    // draw
    return <Table {...tableProps} />;
};

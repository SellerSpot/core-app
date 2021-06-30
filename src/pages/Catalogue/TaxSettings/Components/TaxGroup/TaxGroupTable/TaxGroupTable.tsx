import { State, useState } from '@hookstate/core';
import { IIconButtonProps, showNotify, Table } from '@sellerspot/universal-components';
import { ITaxGroupData } from '@sellerspot/universal-types';
import { AlertDialog } from 'components/Compounds/AlertDialog/AlertDialog';
import { IAlertDialogProps } from 'components/Compounds/AlertDialog/AlertDialog.types';
import React, { ReactElement } from 'react';
import { ITaxSettingsState } from '../../../TaxSettings.types';
import { TaxGroupsTableService } from './TaxGroupTable.service';

interface IDialogState {
    showDialog: boolean;
    taxGroupName: string;
    taxGroupId: string;
}

interface IDialogComponentProps {
    dialogState: State<IDialogState>;
    getAllTaxGroup: () => Promise<void>;
}

interface ITaxGroupsTableProps {
    pageState: State<ITaxSettingsState>;
    getAllTaxGroup: () => Promise<void>;
}

const DialogComponent = (props: IDialogComponentProps) => {
    // props
    const { dialogState, getAllTaxGroup } = props;

    // state
    const isLoading = useState(false);

    // handlers
    const handlePrimaryButtonOnClick = async () => {
        isLoading.set(true);
        // request
        const result = await TaxGroupsTableService.deleteTaxGroup(dialogState.taxGroupId.get());
        // compute
        if (result) {
            await getAllTaxGroup();
            showNotify(`'${dialogState.taxGroupName.get()}' tax group deleted successfully!`, {
                theme: 'success',
            });
        }
        isLoading.set(false);
        dialogState.showDialog.set(false);
    };
    const handleSecondaryButtonOnClick = () => dialogState.showDialog.set(false);

    // compute
    const alertDialogProps: IAlertDialogProps = {
        showDialog: dialogState.showDialog.get(),
        content: `This action will delete tax group '${dialogState.taxGroupName.get()}'`,
        theme: 'error',
        title: 'Are you sure?',
        secondaryButtonProps: {
            disabled: isLoading.get(),
            label: 'CANCEL',
            onClick: handleSecondaryButtonOnClick,
        },
        primaryButtonProps: {
            isLoading: isLoading.get(),
            label: 'DELETE TAX GROUP',
            onClick: handlePrimaryButtonOnClick,
        },
    };

    // draw
    return <AlertDialog {...alertDialogProps} />;
};

export const TaxGroupsTable = (props: ITaxGroupsTableProps): ReactElement => {
    // props
    const { pageState, getAllTaxGroup } = props;

    // state
    const dialogState = useState<IDialogState>({
        showDialog: false,
        taxGroupId: '',
        taxGroupName: '',
    });

    // handlers
    const deleteItemClickHandler =
        (taxGroupData: ITaxGroupData): IIconButtonProps['onClick'] =>
        async (event) => {
            // props
            const { id, name } = taxGroupData;
            event.stopPropagation();

            // state update
            dialogState.merge({
                taxGroupName: name,
                taxGroupId: id,
                showDialog: true,
            });
        };
    const editItemClickHandler =
        (taxGroupData: ITaxGroupData): IIconButtonProps['onClick'] =>
        async (event) => {
            event.stopPropagation();
            // state update
            pageState.taxGroupSlider.merge({
                prefillData: taxGroupData,
                showSliderModal: true,
                isEditMode: true,
            });
        };

    // compute
    const tableProps = TaxGroupsTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return (
        <>
            <Table {...tableProps} />
            <DialogComponent dialogState={dialogState} getAllTaxGroup={getAllTaxGroup} />
        </>
    );
};

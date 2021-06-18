import { State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    showNotify,
    Table,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitPageState } from '../../StockUnit.types';
import { StockUnitTableService } from './StockUnitTable.service';

interface IDialogState {
    showDialog: boolean;
    stockUnitName: string;
    stockUnitId: string;
}

const DialogComponent = (props: {
    dialogState: State<IDialogState>;
    getAllStockUnit: () => Promise<void>;
}) => {
    // props
    const { dialogState, getAllStockUnit } = props;

    // state
    const isLoading = useState(false);

    // handlers
    const handlePrimaryButtonOnClick = async () => {
        isLoading.set(true);
        // request
        const result = await StockUnitTableService.deleteStockUnit(dialogState.stockUnitId.get());
        // compute
        if (result) {
            await getAllStockUnit();
            showNotify(`'${dialogState.stockUnitName.get()}' stock unit deleted successfully!`, {
                theme: 'success',
            });
        }
        isLoading.set(false);
        dialogState.showDialog.set(false);
    };
    const handleSecondaryButtonOnClick = () => dialogState.showDialog.set(false);

    // draw
    return (
        <Dialog showDialog={dialogState.showDialog.get()}>
            <DialogLayoutWrapper>
                <DialogHeader title={'Are you sure?'} />
                <DialogBody>
                    <Alert type="error">{`This action will delete stock unit '${dialogState.stockUnitName.get()}'`}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        theme="primary"
                        disabled={isLoading.get()}
                        label={'CANCEL'}
                        onClick={handleSecondaryButtonOnClick}
                    />
                    <Button
                        variant="contained"
                        theme="danger"
                        isLoading={isLoading.get()}
                        label={'DELETE STOCK UNIT'}
                        onClick={handlePrimaryButtonOnClick}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};

export const StockUnitTable = (props: {
    pageState: State<IStockUnitPageState>;
    getAllStockUnit: () => Promise<void>;
}): ReactElement => {
    // props
    const { pageState, getAllStockUnit } = props;

    // state
    const dialogState = useState<IDialogState>({
        showDialog: false,
        stockUnitId: '',
        stockUnitName: '',
    });

    // handlers
    const deleteItemClickHandler = (stockUnitData: IStockUnitData) => async () => {
        // props
        const { id, name } = stockUnitData;

        // state update
        dialogState.merge({
            stockUnitName: name,
            stockUnitId: id,
            showDialog: true,
        });
    };
    const editItemClickHandler = (stockUnitData: IStockUnitData) => async () => {
        // state update
        pageState.slider.merge({
            prefillData: stockUnitData,
            showSliderModal: true,
            isEditMode: true,
        });
    };

    // compute
    const tableProps = StockUnitTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return (
        <>
            <Table {...tableProps} />
            <DialogComponent dialogState={dialogState} getAllStockUnit={getAllStockUnit} />
        </>
    );
};

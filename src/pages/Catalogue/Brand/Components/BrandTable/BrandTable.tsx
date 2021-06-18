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
import { IBrandData } from '@sellerspot/universal-types';
import React, { ReactElement } from 'react';
import { IBrandPageState } from '../../Brand.types';
import { BrandTableService } from './BrandTable.service';

interface IDialogState {
    showDialog: boolean;
    brandName: string;
    brandId: string;
}

const DialogComponent = (props: {
    dialogState: State<IDialogState>;
    getAllBrand: () => Promise<void>;
}) => {
    // props
    const { dialogState, getAllBrand } = props;

    // state
    const isLoading = useState(false);

    // handlers
    const handlePrimaryButtonOnClick = async () => {
        isLoading.set(true);
        // request
        const result = await BrandTableService.deleteBrand(dialogState.brandId.get());
        // compute
        if (result) {
            getAllBrand();
            showNotify(`${dialogState.brandName.get()} brand deleted successfully!`, {
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
                    <Alert type="error">{`This action will delete brand ${dialogState.brandName.get()}`}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        theme="primary"
                        disabled={isLoading.get()}
                        label={'Cancel'}
                        onClick={handleSecondaryButtonOnClick}
                    />
                    <Button
                        variant="contained"
                        theme="danger"
                        isLoading={isLoading.get()}
                        label={'Delete Brand'}
                        onClick={handlePrimaryButtonOnClick}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};

export const BrandTable = (props: {
    pageState: State<IBrandPageState>;
    getAllBrand: () => Promise<void>;
}): ReactElement => {
    // props
    const { pageState, getAllBrand } = props;

    // state
    const dialogState = useState<IDialogState>({
        showDialog: false,
        brandName: '',
        brandId: '',
    });

    // handlers
    const deleteItemClickHandler = (brandData: IBrandData) => async () => {
        // props
        const { id, name } = brandData;

        // state update
        dialogState.merge({
            brandName: name,
            brandId: id,
            showDialog: true,
        });
    };
    const editItemClickHandler = (brandData: IBrandData) => async () => {
        // state update
        pageState.slider.merge({
            prefillBrandData: brandData,
            showSliderModal: true,
            isEditMode: true,
        });
    };

    // compute
    const tableProps = BrandTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return (
        <>
            <Table {...tableProps} />
            <DialogComponent dialogState={dialogState} getAllBrand={getAllBrand} />
        </>
    );
};

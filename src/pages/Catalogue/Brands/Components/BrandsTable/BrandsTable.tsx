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
import { IBrandsPageState } from '../../Brands.types';
import { BrandsTableService } from './BrandsTable.service';

interface IDialogState {
    showDialog: boolean;
    brandName: string;
    brandId: string;
}

const DialogComponent = (props: {
    dialogState: State<IDialogState>;
    getAllBrands: () => Promise<void>;
}) => {
    // props
    const { dialogState, getAllBrands } = props;

    // state
    const isLoading = useState(false);

    // handlers
    const handlePrimaryButtonOnClick = async () => {
        isLoading.set(true);
        // request
        const result = await BrandsTableService.deleteBrand(dialogState.brandId.get());
        // compute
        if (result) {
            getAllBrands();
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

export const BrandsTable = (props: {
    pageState: State<IBrandsPageState>;
    getAllBrands: () => Promise<void>;
}): ReactElement => {
    // props
    const { pageState, getAllBrands } = props;

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
            prefillBrandsData: brandData,
            showSliderModal: true,
            isEditMode: true,
        });
    };

    // compute
    const tableProps = BrandsTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return (
        <>
            <Table {...tableProps} />
            <DialogComponent dialogState={dialogState} getAllBrands={getAllBrands} />
        </>
    );
};

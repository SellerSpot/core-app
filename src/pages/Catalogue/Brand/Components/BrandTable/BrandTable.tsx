import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import { IBrandData } from '@sellerspot/universal-types';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import React, { ReactElement } from 'react';
import { IBrandPageState } from '../../Brand.types';
import { BrandTableService } from './BrandTable.service';

export const BrandTable = (props: {
    pageState: State<IBrandPageState>;
    getAllBrand: () => Promise<void>;
}): ReactElement => {
    // props
    const { pageState, getAllBrand } = props;

    // hooks
    const { confirm, closeDialog, setLoading } = useConfirmDialog();

    // handlers
    const deleteItemClickHandler = (brandData: IBrandData) => async () => {
        // props
        const { id, name } = brandData;

        // confirm
        const confirmResult = await confirm({
            title: 'Are you sure?',
            content: `This will permanently delete the brand "${name}"`,
            theme: 'warning',
            primaryButtonProps: {
                theme: 'danger',
                label: 'DELETE',
            },
            secondaryButtonProps: {
                theme: 'primary',
                label: 'CANCEL',
            },
        });

        // actions
        if (confirmResult) {
            setLoading({ isLoading: true });
            const result = await BrandTableService.deleteBrand(id);
            if (result) {
                await getAllBrand();
                setLoading({ isLoading: false });
            }
        }
        closeDialog();
    };
    const editItemClickHandler = (brandData: IBrandData) => async () => {
        // state update
        pageState.sliderModal.merge({
            prefillData: brandData,
            showModal: true,
            mode: 'edit',
        });
    };

    // compute
    const tableProps = BrandTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return <Table {...tableProps} />;
};

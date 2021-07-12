import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import { IStockUnitData } from '@sellerspot/universal-types';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import React, { ReactElement } from 'react';
import { IStockUnitPageState } from '../../StockUnit.types';
import { StockUnitTableService } from './StockUnitTable.service';

interface IStockUnitTableProps {
    pageState: State<IStockUnitPageState>;
    getAllStockUnit: () => Promise<void>;
}

export const StockUnitTable = (props: IStockUnitTableProps): ReactElement => {
    // props
    const { pageState, getAllStockUnit } = props;

    // hooks
    const { confirm, closeDialog, setLoading } = useConfirmDialog();

    // handlers
    const deleteItemClickHandler = (stockUnitData: IStockUnitData) => async () => {
        // props
        const { id, name } = stockUnitData;

        // confirm
        const confirmResult = await confirm({
            title: 'Are you sure?',
            content: `This will permanently delete the stock unit "${name}"`,
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
            const result = await StockUnitTableService.deleteStockUnit(id);
            if (result) {
                await getAllStockUnit();
                setLoading({ isLoading: false });
            }
        }
        closeDialog();
    };
    const editItemClickHandler = (stockUnitData: IStockUnitData) => async () => {
        // state update
        pageState.sliderModal.merge({
            prefillData: stockUnitData,
            showModal: true,
            mode: 'edit',
        });
    };

    // compute
    const tableProps = StockUnitTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return <Table {...tableProps} />;
};

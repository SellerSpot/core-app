import React, { ReactElement, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Button,
    IconButton,
    ITableCollapsedCustomRenderer,
    ITableProps,
    numberFormatINRCurrency,
    showNotify,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
    SliderModalLayoutWrapper,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ISaleData } from '@sellerspot/universal-types';
import { useState } from '@hookstate/core';
import { rawClone } from 'utilities/general';
import { SalesHistoryService } from '../../../SalesHistory/SalesHistory.service';
import { ICONS } from 'utilities/utilities';
import Icon from '@iconify/react';
import { ParkedSaleExpandedView } from './components/ParkedSaleExpandedView/ParkedSaleExpandedView';
import styles from './ParkedSalesSliderModal.module.scss';
import { newSaleState } from '../../NewSale';
import { NewSaleService } from '../../NewSale.service';

// for using fromNow api we need relativeTime plugin to be extended
dayjs.extend(relativeTime);

interface IParkedSalesSliderModalProps {
    searchFieldFocusTriggerer: () => void;
}

export const ParkedSalesSliderModal = (props: IParkedSalesSliderModalProps): ReactElement => {
    // props
    const { searchFieldFocusTriggerer } = props;

    // state
    const parkedSalesModal = useState(newSaleState.modals.parkedSales);
    const isLoading = useState(true);
    const isError = useState(false);
    const parkedSales = useState<ISaleData[]>([]);

    // effects
    // fetch table data on mount
    useEffect(() => {
        SalesHistoryService.fetchSalesHistory()
            .then((saleDataResponse) => {
                parkedSales.set(saleDataResponse);
                isLoading.set(false);
            })
            .catch((error) => {
                isError.set(true);
                showNotify(error?.message);
            });
    }, [parkedSalesModal.get()]);

    // handlers
    const modalGoBackHandler = () => {
        // go back handler
        parkedSalesModal.set(false);
        searchFieldFocusTriggerer();
    };

    const retrieveSaleHandler = (saleData: ISaleData) => () => {
        // fill the newSale slider with the sale data
        // tell the server that we are retrieving the sale
        NewSaleService.retrieveSale(saleData); // async
        showNotify('Parked sale has been retrieved!');
        searchFieldFocusTriggerer();
    };

    const deleteRetrievedSaleHandler = (saleData: ISaleData, rowIndex: number) => () => {
        // tell the server that we are deleting the retrieved sale
        NewSaleService.deleteParkedSale(saleData.id); // async
        const parkedSalesData = rawClone(parkedSales.get());
        parkedSalesData.splice(rowIndex, 1); // removing the item from the array in-place
        parkedSales.set(parkedSalesData);
        showNotify('Parked sale has been deleted!');
    };

    // render helpers
    const serialNumberRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowIndex } = props;
        // draw
        return rowIndex + 1;
    };

    const saleTimeRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return dayjs(rowData.createdAt).fromNow();
    };

    const nameRenderer =
        (type: 'customer' | 'user'): TTableCellCustomRenderer<ISaleData> =>
        (props) => {
            // props
            const { rowData } = props;
            // draw
            return rowData[type].name; // later we'll be having  a link to the customer, which displays chart for the particular customer
        };

    const saleTotalRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return numberFormatINRCurrency(rowData.payment.grandTotal); // later we'll be having  a link to the customer, which displays chart for the particular customer
    };

    const actionsRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData, rowIndex } = props;
        // draw
        return (
            <div className={styles.mainTableActionsWrapper}>
                <Button
                    startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                    label="Retrieve"
                    variant="contained"
                    theme="primary"
                    size="small"
                    onClick={retrieveSaleHandler(rowData)}
                />
                <IconButton
                    theme={'danger'}
                    icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                    onClick={deleteRetrievedSaleHandler(rowData, rowIndex)}
                />
            </div>
        );
    };

    const emptyTableCTA = () => {
        // handlers
        const onClickHandler = () => modalGoBackHandler();

        return (
            <Button
                label="NEW SALE"
                theme="primary"
                size="small"
                onClick={onClickHandler}
                variant="contained"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };

    const collapsedContentRenderer: ITableCollapsedCustomRenderer<ISaleData> = (props) => {
        const { rowData, rowIndex } = props;
        return (
            <ParkedSaleExpandedView
                rowData={rowData}
                onRetrieveSaleClickHandler={retrieveSaleHandler(rowData)}
                onDeleteSaleClickHandler={deleteRetrievedSaleHandler(rowData, rowIndex)}
            />
        );
    };

    const tableProps: ITableProps<ISaleData> = {
        stickyHeader: true,
        uniqueKey: 'id',
        isLoading: isLoading.get(),
        emptyStateMessage: 'No parked sales History found',
        emptyStatePrimaryCallToAction: emptyTableCTA(),
        data: rawClone(parkedSales.get()),
        shape: [
            {
                columnName: 'Sno',
                align: 'center',
                width: '5%',
                customRenderer: serialNumberRenderer,
            },
            {
                columnName: 'Sale time',
                align: 'left',
                width: '15%',
                customRenderer: saleTimeRenderer,
            },
            {
                columnName: 'Customer name',
                align: 'left',
                width: '20%',
                customRenderer: nameRenderer('customer'),
            },
            {
                columnName: 'Cashier name',
                align: 'left',
                width: '20%',
                customRenderer: nameRenderer('user'),
            },
            {
                columnName: 'Sale total',
                align: 'right',
                width: '20%',
                dataKey: 'customer',
                customRenderer: saleTotalRenderer,
            },
            {
                columnName: 'Actions',
                align: 'center',
                width: '20%',
                customRenderer: actionsRenderer,
                blockClickEventBubbling: true,
            },
        ],
        collapsedContentRenderer,
    };

    // draw
    return (
        <SliderModal showModal={parkedSalesModal.get()} type={'fixed'} width={'70%'}>
            <SliderModalLayoutWrapper>
                <SliderModalHeader
                    modalGoBackText="Go back to cart"
                    modalGoBackCallback={modalGoBackHandler}
                    title="Parked sales"
                    titlePlacement="center"
                />
                <SliderModalBody>
                    <div className={styles.wrapper}>
                        <Table {...tableProps} />
                    </div>
                </SliderModalBody>
            </SliderModalLayoutWrapper>
        </SliderModal>
    );
};

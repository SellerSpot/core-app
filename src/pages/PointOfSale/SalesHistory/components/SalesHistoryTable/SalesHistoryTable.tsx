import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Button,
    ITableCollapsedCustomRenderer,
    ITableProps,
    numberFormatINRCurrency,
    showNotify,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ESaleStatus, ISaleData } from '@sellerspot/universal-types';
import { useState } from '@hookstate/core';
import { rawClone } from 'utilities/general';
import { SalesHistoryService } from '../../SalesHistory.service';
import { ICONS } from 'utilities/utilities';
import Icon from '@iconify/react';
import { ROUTES } from 'config/routes';
import { SaleHistoryExpandedView } from './components/SaleHistoryExpandedView/SaleHistoryExpandedView';
import { capitalize } from 'lodash';

// for using fromNow api we need relativeTime plugin to be extended
dayjs.extend(relativeTime);

export const SalesHistoryTable = (): ReactElement => {
    // state
    const isLoading = useState(true);
    const isError = useState(false);
    const salesHistory = useState<ISaleData[]>([]);

    // hooks
    const history = useHistory();

    // effects
    // fetch table data on mount
    useEffect(() => {
        SalesHistoryService.fetchSalesHistory()
            .then((saleDataResponse) => {
                salesHistory.set(saleDataResponse);
                isLoading.set(false);
            })
            .catch((error) => {
                isError.set(true);
                showNotify(error?.message);
            });
    }, []);

    // handlers
    const voidSaleClickHanlder = (saleData: ISaleData, saleIndex: number) => () => {
        SalesHistoryService.voidSale(saleData.id);
        salesHistory[saleIndex].status.set(ESaleStatus.VOIDED); // update the server, but no need to wait for ping back from server
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

    const saleStatusRenderer: TTableCellCustomRenderer<ISaleData> = (props) => {
        // props
        const { rowData } = props;
        // draw
        return capitalize(rowData.status); // later we'll be having  a link to the customer, which displays chart for the particular customer
    };

    const emptyTableCTA = () => {
        // handlers
        const onClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__NEW_SALE);

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
            <SaleHistoryExpandedView
                onVoidSaleClick={voidSaleClickHanlder(rowData, rowIndex)}
                rowData={rowData}
            />
        );
    };

    const tableProps: ITableProps<ISaleData> = {
        stickyHeader: true,
        uniqueKey: 'id',
        isLoading: isLoading.get(),
        emptyStateMessage: 'No Sales History found',
        emptyStatePrimaryCallToAction: emptyTableCTA(),
        data: rawClone(salesHistory.get()),
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
                columnName: 'Status',
                align: 'center',
                width: '20%',
                dataKey: 'status',
                customRenderer: saleStatusRenderer,
            },
        ],
        collapsedContentRenderer,
    };

    // draw
    return <Table {...tableProps} />;
};
